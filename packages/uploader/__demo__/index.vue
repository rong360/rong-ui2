<template>
  <div class="upload-example">
    <Titlebar theme="b"
              @on-back="onBack">Uploader</Titlebar>
    <br>
    <r-uploader action="/test/fileUpload"
            :defaultFileList="fileList"
            :disabled="fileList.length >= 3"
            :onSuccess="handleSuccess"
            :onRemove="handleRemove"></r-uploader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      fileList: [{
        url: 'https://t7.baidu.com/it/u=737555197,308540855&fm=193&f=GIF'
      }]
    }
  },
  methods: {
    onBack () {
      this.$router.push('/')
    },
    handleSuccess (res, file, fileList) {
      this.fileList = fileList
    },
    handleRemove (file, fileList) {
      this.fileList = fileList
    }
  }
}
</script>

<style lang="less" scoped>
.upload-example {
  background-color: #bebebe;
}
</style>
