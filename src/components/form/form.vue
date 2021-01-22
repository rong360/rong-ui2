<template>
  <div :class="wrapCls">
    <slot></slot>
  </div>
</template>

<script>
import { oneOf } from '../../utils/assist.js'
const prefixCls = 'r--form'

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
    },
    selectCancelBtnText: String,
    selectConfirmBtnText: String,
    datePickerCancelBtnText: String,
    datePickerConfirmBtnText: String,
    mode: {
      type: String
    },
    // 错误信息显示在placeholder位置
    errorAtPlaceholder: Boolean
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
      this.$emit('on-iscompleted', isCompleted)
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
