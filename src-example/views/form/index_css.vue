<template>
  <div class="form-css-example">
    <Titlebar theme="b"
              @on-back="onBack">Form</Titlebar>
    <Form :select-arrow-style="{color: '#C8C7CC'}"
          :input-clear-style="{color: '#C8C7CC'}"
          @isCompleted="setIsCompleted"
          placeholder=""
          ref="form">
      <components v-for="item in viewData.firstLevel"
                  :is="item.componentType"
                  v-model="item.value"
                  :attrs="item"
                  :key="item.id"
                  ref="cpList" />
      <div class="btn-wrap">
        <div :class="['btn', isCompleted ? '' : 'disabled']"
             @click="doSubmit">
          <p>提交({{ isCompleted ? "填写完毕" : "未填完" }})</p>
          <p>validate</p>
        </div>
        <div :class="['btn', isCompleted ? '' : 'disabled']"
             @click="doSubmit2">
          <p>提交({{ isCompleted ? "填写完毕" : "未填完" }})</p>
          <p>validateOneByOne</p>
        </div>
        <div class="btn"
             @click="doReset">重设</div>
      </div>
    </Form>
    <div class="result">
      <p v-for="item in viewData.basic"><span>{{item.title}}：</span>{{item.value}}</p>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

function componentfactory (type) {
  var component = { componentType: 'Input', verifyType: 'text' };
  switch (type) {
    case "3":
    case "4":
    case "9":
      component = {
        componentType: 'Input',
        verifyType: 'number'
      }
      break;
    case "email":
      component = {
        componentType: 'Input',
        verifyType: 'email'
      }
      break;
    case "50":
      component = {
        componentType: 'Input',
        verifyType: 'IDCard'
      }
      break;
    case "select":
    case "2":
    case "1":
      component = 'rSelect'
      component = {
        componentType: 'Select',
        verifyType: ''
      }
      break;
  }
  return component;
}

export default {
  beforeRouteEnter (to, from, next) {
    _app
      .$fetch({
        url: "/taojinyun/basicinfo"
      })
      .then(res => {
        let basic = res.data.basic,
          basicMap = {},
          firstLevel = []
        _.each(basic, item => {
          let type = item.verify_type == 0 ? item.type : item.verify_type
          item.componentType = componentfactory(type).componentType
          item.type = componentfactory(type).verifyType
          // 用户姓名特殊校验
          if (item.id == 277) {
            item.rules.push({
              validator (rule, value, callback) {
                if (value.length < 3) {
                  return new Error('姓名最少三个字')
                }
                callback()
              },
              trigger: 'blur'
            })
          }
          // 申请金额不能为0
          if (item.id == 692) {
            item.rules = [{ required: true, message: '***申请金额不能为空***', trigger: 'blur' }]
            item.rules.push({
              validator (rule, value, callback) {
                if (value == 0) {
                  return new Error('申请金额不能为零！')
                }
                callback()
              },
              trigger: 'blur'
            })
          }
          if (item.id == 836) {
            item.componentType = 'Input'
            item.type = 'hidden'
            item.rules = []
            if (window.navigator.geolocation) {
              window.navigator.geolocation.getCurrentPosition && window.navigator.geolocation.getCurrentPosition(function (position) {
                // coords.latitude十进制数的纬度
                // coords.longitude十进制数的经度
                item.value = position.coords.longitude + ',' + position.coords.latitude
              }, function () { }, {
                enableHighAccuracy: true,
                timeout: 45000
              })
            } else {
              _.remove(basic, { id: "836" })
              item.value = '无法获取gps'
              console.log('Your browser does not natively support geolocation.');
            }
          }
          // basic生成map机构，方便数据查找
          basicMap[item.id] = item
          // 数据分级
          if (item.level == 1) firstLevel.push(item)
          // 添加name属性
          item.name = item.id
          item.var_name = ''
        })
        // 构造rSelect的children数据
        _.each(basic, item => {
          if (item.componentType == 'Select') {
            item.data.forEach(option => {
              option.text = option.desc
              if (option.rely && option.rely.length) {
                option.children = option.rely.map(id => {
                  return basicMap[id]
                })
              }
            })
          }
        })
        CONST.cache.userbasicinfo = {
          basic: basic,
          firstLevel: firstLevel
        }
        next();
      })
      .catch(err => {
        console.log(err);
      });
  },
  data () {
    return {
      viewData: CONST.cache.userbasicinfo,
      fields: [],
      isCompleted: false
    }
  },
  // computed: {
  //   isCompleted () {
  //     return this.fields.every(field => {
  //       if (field.fieldRules.length) {
  //         return field.currentValue != ''
  //       } else {
  //         return true
  //       }
  //     })
  //   }
  // },
  mounted () {
    this.fields = this.$refs.form.fields
  },
  methods: {
    doSubmit () {
      this.$refs.form.validate((valid, validateMessage) => {
        if (valid) {
          console.log('getValue', this.$refs.form.getValue())
          console.log('getSerializeValue', this.$refs.form.getSerializeValue())
          console.log('getObjectValue', this.$refs.form.getObjectValue())
        } else {
          this.$dialog({
            propsData: {
              message: validateMessage.map(item => item.replace('不能为空', '')).join('、') + '不能为空'
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
        }
      })
    },
    doSubmit2 () {
      this.$refs.form.validateOneByOne((valid, validateMessage) => {
        if (valid) {
          console.log('getValue', this.$refs.form.getValue())
          console.log('getSerializeValue', this.$refs.form.getSerializeValue())
          console.log('getObjectValue', this.$refs.form.getObjectValue())
        } else {
          this.$dialog({
            propsData: {
              message: validateMessage
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
        }
      })
    },
    setIsCompleted (value) {
      this.isCompleted = value
    },
    doReset () {
      this.$refs.form.resetFields()
    },
    onEnter (e) {
      console.log(e.target.value)
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.btn-wrap {
  display: flex;
  .btn {
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
    margin: 10px;
    padding: 10px 0;
    text-align: center;
    background-color: darkcyan;
    color: #fff;
    font-size: 12px;
    &.disabled {
      background-color: gray;
    }
  }
}

.form-css-example {
  .r--input,
  .r--select {
    padding-top: 10px;
    margin-top: 30px;
  }
  .r--input .r--input-label,
  .r--select .r--select-label {
    position: absolute;
    color: #717171;
    top: 26px;
    left: 4px;
    z-index: 2;
    transition: all 0.3s ease-out;
  }
  .r--input.r--input-focused .r--input-label,
  .r--input:not(.r--input-empty) .r--input-label,
  .r--select.r--select-focused .r--select-label,
  .r--select:not(.r--select-empty) .r--select-label {
    top: 0;
    font-size: 12px;
  }
  .r--input-error .r--input-inner {
    border-bottom-color: #ed4014;
  }
  .r--input-error-tip {
    padding-left: 5px;
  }
  .r--select-arrow-right svg {
    transform: rotate(90deg);
  }
  .r--input-input {
    padding-left: 4px;
  }

  .result {
    font-size: 14px;
    color: #333333;
    padding: 10px;
    background-color: lightgray;
  }
}
</style>
