<template>
  <div :class="wrapCls">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--form'

// 判断参数是否是其中之一
function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export default {
  name: 'Form',
  data () {
    return {
      fields: []
    }
  },
  props: {
    labelPosition: {
      type: String,
      validator (value) {
        return oneOf(value, ['left', 'right', 'top'])
      }
    },
    labelWidth: {
      type: String
    },
    textPosition: {
      type: String,
      validator (value) {
        return oneOf(value, ['left', 'center', 'right'])
      }
    },
    placeholder: {
      type: String
    },
    inputClearStyle: {
      type: Object
    },
    selectArrowStyle: {
      type: Object
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isCompleted () {
      let isCompleted = this.fields.every(field => {
        if (field.fieldRules.length) {
          return field.value != ''
        } else {
          return true
        }
      })
      this.$emit('isCompleted', isCompleted)
      return isCompleted
    },
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-not-completed`]: !this.isCompleted
        }
      ]
    }
  },
  provide () {
    return {
      form: this
    }
  },
  methods: {
    validate (callback) {
      return new Promise(resolve => {
        let valid = true
        let validateMessage = []
        let firstInvalidField = null
        let count = 0
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
              if (!firstInvalidField) {
                firstInvalidField = field
              }
              validateMessage.push(errors)
            }
            if (++count == this.fields.length) {
              resolve(valid, errors)
              if (typeof callback === 'function') {
                callback(valid, validateMessage)
                firstInvalidField && firstInvalidField.$el.scrollIntoView()
              }
            }
          })
        })
      })
    },
    validateOneByOne (callback) {
      return new Promise(resolve => {
        let fields = [...this.fields]
        function next (fields = []) {
          let field = fields.shift()
          if (field) {
            field.validate('', errors => {
              if (!errors) {
                next(fields)
              } else {
                callback && callback(false, errors)
                resolve(false, errors)
                field.$el.scrollIntoView()
              }
            })
          } else {
            callback && callback(true)
            resolve(true)
          }
        }
        next(fields)
      })
    },
    /* 获取表单数据 */
    getValue () {
      return this.fields.map(field => {
        return field.getValue()
      })
    },
    getSerializeValue () {
      let fieldsValue = this.getValue()
      return fieldsValue.map(obj => obj.name + '=' + obj.value).join('&')
    },
    getObjectValue () {
      let fieldsValue = this.getValue()
      return Object.assign({}, ...fieldsValue.map(obj => ({ [obj.name]: obj.value })))
    },
    resetFields () {
      this.fields.forEach(field => {
        field.resetField()
      })
    }
  }
}
</script>

<style lang="less">
@formCls: r--form;
</style>
