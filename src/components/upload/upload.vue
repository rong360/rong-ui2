<template>
  <div :class="wrapCls">
    <template v-if="showUploadList">
      <div v-for="item in fileList"
           :class="picItemCls">
        <div class="remove"
             @click="handleRemove(item)">
          <slot name="remove"><svg class="remove-icon"
                 viewBox="64 64 896 896"
                 width="1em"
                 height="1em"
                 fill="currentColor">
              <path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
            </svg></slot>
        </div>
        <img :src="item.imgUrl" />
      </div>
    </template>
    <div :class="selectCls"
         @click="handleClick">
      <input ref="input"
             type="file"
             :multiple="multiple"
             :accept="accept"
             @change="handleChange" />
      <slot><svg class="select-icon"
             viewBox="64 64 896 896"
             width="1em"
             height="1em"
             fill="currentColor">
          <path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path>
          <path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path>
        </svg></slot>
    </div>
  </div>
</template>

<script>
import ajax from './ajax'
const prefixCls = 'r--upload'

export default {
  name: 'Upload',
  props: {
    action: {
      type: String,
      required: true
    },
    headers: {
      type: Object,
      default: () => { }
    },
    data: Object,
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: {
      type: Boolean,
      default: false
    },
    showUploadList: {
      type: Boolean,
      default: true
    },
    multiple: Boolean,
    accept: String,
    disabled: Boolean,
    maxSize: Number,
    format: {
      type: Array,
      default: () => []
    },
    beforeUpload: Function,
    defaultFileList: {
      type: Array,
      default: () => []
    },
    onProgress: {
      type: Function,
      default: () => {}
    },
    onSuccess: {
      type: Function,
      default: () => {}
    },
    onError: {
      type: Function,
      default: () => {}
    },
    onRemove: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      fileList: [],
      tempIndex: 1
    }
  },
  computed: {
    wrapCls () {
      return [
        prefixCls,
        {
          [`${prefixCls}-disabled`]: !!this.disabled
        }
      ]
    },
    selectCls () {
      return `${prefixCls}-select`
    },
    picItemCls () {
      return `${prefixCls}-pic-item`
    }
  },
  watch: {
    defaultFileList: {
      immediate: true,
      handler (fileList) {
        this.fileList = fileList.map(item => {
          item.status = 'finished';
          item.percentage = 100;
          item.uid = Date.now() + this.tempIndex++;
          return item;
        });
      }
    }
  },
  methods: {
    handleClick () {
      if (this.disabled) return
      this.$refs.input.click()
    },
    handleChange (e) {
      const files = e.target.files

      if (!files) return
      this.uploadFiles(files)
      e.target.value = ''
    },
    uploadFiles (files) {
      let postFiles = [].slice.call(files)
      if (!this.multiple) postFiles = postFiles.slice(0, 1)

      if (postFiles.length === 0) return

      postFiles.forEach(file => this.upload(file))
    },
    upload (file) {
      if (!this.beforeUpload) {
        return this.post(file)
      }
      const before = this.beforeUpload(file);
      if (before && before.then) {
        before.then(processedFile => {
          if (Object.prototype.toString.call(processedFile) === '[object File]') {
            this.post(processedFile);
          } else {
            this.post(file);
          }
        }, () => { });
      } else if (before !== false) {
        this.post(file);
      }
    },
    post (file) {
      // check format
      if (this.format.length) {
        let fileForamt = file.name.split('.').pop().toLocaleLowerCase()
        let checked = this.format.some(item => item.toLocaleLowerCase() === fileForamt)
        if (!checked) {
          this.onFormatError(file, this.fileList)
          return false
        }
      }

      // check maxSize
      if (this.maxSize) {
        if (file.size > this.maxSize * 1024) {
          this.onExceededSize(file, this.fileList)
          return false
        }
      }

      this.handleStart(file)

      // 接口测试
      if (this.action.includes('test')) {
        setTimeout(() => {
          let res = { status: 1 }
          this.handleSuccess(res, file)
        }, 500)
        return
      }

      ajax({
        headers: this.headers,
        withCredentials: this.withCredentials,
        file: file,
        data: this.data,
        filename: this.name,
        action: this.action,
        onProgress: e => {
          this.handleProgress(e, file);
        },
        onSuccess: res => {
          this.handleSuccess(res, file);
        },
        onError: (err, response) => {
          this.handleError(err, response, file);
        }
      });
    },
    handleStart (file) {
      file.uid = Date.now() + this.tempIndex++;
      const _file = {
        status: 'uploading',
        name: file.name,
        size: file.size,
        percentage: 0,
        uid: file.uid,
        showProgress: true,
        imgUrl: ''
      };

      this.fileList.push(_file);
    },
    getFile (file) {
      return this.fileList.find(item => item.uid === file.uid)
    },
    handleProgress (e, file) {
      let _file = this.getFile(file)
      _file.percentage = e.percent || 0
      this.onProgress(e, _file, this.fileList)
    },
    handleSuccess (res, file) {
      const self = this
      const _file = this.getFile(file)
      if (_file) {
        _file.status = 'finished'
        _file.response = res

        new Promise((resolve, reject) => {
          let reader = new FileReader()

          reader.addEventListener("load", function () {
            _file.imgUrl = this.result;
            resolve()
          }, false);

          reader.readAsDataURL(file);
        }).catch((err) => {
          console.log(err)
        }).finally(() => {
          self.onSuccess(res, _file, self.fileList)
        })
      }
    },
    handleError (err, response, file) {
      const _file = this.getFile(file);
      const fileList = this.fileList;

      _file.status = 'fail';

      fileList.splice(fileList.indexOf(_file), 1);

      this.onError(err, response, file);
    },
    handleRemove (file) {
      const fileList = this.fileList
      fileList.splice(fileList.indexOf(file), 1)
      this.onRemove(file, fileList)
    }
  }
}
</script>

<style lang="less">
@uploadCls: r--upload;
.@{uploadCls} {
  &::after {
    content: "";
    display: block;
    clear: both;
  }
  &-pic-item,
  &-select {
    float: left;
    width: 80px;
    height: 80px;
  }
  &-pic-item {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      border-radius: 8px;
    }
    .remove {
      position: absolute;
      right: 0px;
      top: 0px;
      transform: translate(50%, -50%);
      .remove-icon {
        font-size: 15px;
        background-color: red;
        border-radius: 50%;
        color: #fff;
      }
    }
  }
  &-select {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    background-color: #fff;
    input {
      display: none;
    }
    .select-icon {
      font-size: 30px;
      background-color: #fff;
      color: #666;
    }
  }
}
</style>
