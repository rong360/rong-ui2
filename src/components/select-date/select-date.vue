tem
<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle">{{attrs.title}}</label>
      <slot name="prepend"></slot>
      <div :class="contentCls">
        <DatePicker :attrs="attrs"
                    :pickerTitle="pickerTitle"
                    :pickerCancelBtnText="pickerCancelBtnText"
                    :pickerConfirmBtnText="pickerConfirmBtnText"
                    @onconfirm="onConfirm"
                    :class="selectCls"></DatePicker>
        <div :class="arrowCls">
          <slot name="arrow-icon">
            <svg width="8px"
                 height="15px"
                 :style="arrowStyle"
                 viewBox="0 0 8 15"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none"
                 stroke-width="1"
                 fill="none"
                 fill-rule="evenodd">
                <g transform="translate(-352.000000, -60.000000)"
                   :fill="arrowStyle.color || '#C8C7CC'">
                  <g transform="translate(0.000000, 45.000000)">
                    <polygon transform="translate(356.000000, 22.500000) rotate(180.000000) translate(-356.000000, -22.500000) "
                             points="352 22.5 359.396709 15.5 360 16.0561744 353.208809 22.5 360 28.944874 359.396709 29.5"></polygon>
                  </g>
                </g>
              </g>
            </svg>
          </slot>
        </div>
      </div>
      <div v-if="attrs.unit"
           :class="unitCls">{{attrs.unit}}</div>
      <slot name="append"></slot>
    </div>
    <transition name="fade"
                mode="out-in">
      <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage)"
           :class="errorCls">{{validateMessage}}</div>
    </transition>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import { oneOf } from '../../utils/assist.js'
import DatePicker from '../date-picker/date-picker'
const prefixCls = 'r--selectdate'

export default {
  name: 'SelectDate',
  props: {
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    value: [String, Number],
    rules: {
      type: Array
    },
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
    selectArrowStyle: {
      type: Object
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    },
    pickerTitle: String,
    pickerCancelBtnText: String,
    pickerConfirmBtnText: String,
    confirmBtnText: String,
    mode: {
      type: String
    }
  },
  data () {
    return {
      initialValue: '',
      validateState: '',
      validateMessage: '',
      validateDisabled: false
    }
  },
  inject: {
    form: { default: null }
  },
  computed: {
    wrapCls () {
      let labelPosition = this.attrs.labelPosition || this.labelPosition || this.form && this.form.labelPosition || 'right'
      let textPosition = this.attrs.textPosition || this.textPosition || this.form && this.form.textPosition || 'left'
      let mode = this.attrs.mode || this.mode || this.form && this.form.mode || 'default'

      return [
        this.form && 'form-item',
        `${prefixCls}`,
        `${prefixCls}-label-${labelPosition}`,
        `${prefixCls}-text-${textPosition}`,
        `${prefixCls}-mode-${mode}`,
        {
          [`${prefixCls}-focused`]: this.focused,
          [`${prefixCls}-empty`]: this.value == '',
          [`${prefixCls}-error`]: this.validateState == 'error',
          [`${prefixCls}-readonly`]: !!this.attrs.readonly,
          [`${prefixCls}-placeholder`]: this.value == ''
        }
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    labelCls () {
      return `${prefixCls}-label`
    },
    labelStyle () {
      let style = {}
      if (this.labelWidth || this.labelWidth == 0) {
        style.width = this.labelWidth
      } else if (this.form && (this.form.labelWidth || this.form.labelWidth == 0)) {
        style.width = this.form.labelWidth
      }
      return style
    },
    arrowStyle () {
      let style = { color: '#C8C7CC', width: '8px', height: '15px' }
      return this.selectArrowStyle || (this.form && this.form.selectArrowStyle) || style
    },
    contentCls () {
      return `${prefixCls}-content`
    },
    selectCls () {
      return `${prefixCls}-select`
    },
    arrowCls () {
      return `${prefixCls}-arrow-right`
    },
    unitCls () {
      return `${prefixCls}-unit`
    },
    errorCls () {
      return `${prefixCls}-error-tip`
    },
    fieldRules () {
      let defaultRules = [{ required: true, message: `${this.attrs.title}不能为空` }]
      let rules = this.attrs.rules || this.rules || defaultRules
      return [].concat(rules)
    }
  },
  components: {
    DatePicker
  },
  mounted () {
    this.form && this.form.fields.push(this)
    this.initialValue = this.value
  },
  methods: {
    onConfirm (date) {
      this.$emit('input', date.value)
      this.$emit("on-confirm", date);
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
    },
    getFilterRules (trigger) {
      return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) != -1)
    },
    validate (trigger, callback = function () { }) {
      let rules = this.getFilterRules(trigger)

      this.validateState = 'validating'
      this.validateDisabled = false

      if (this.attrs.readonly) {
        this.validateState = 'success'
        this.validateMessage = ''
        callback(this.validateMessage)
        return
      }

      let prop = this.attrs.name || this.attrs.var_name || this.attrs.title || 'prop'
      let descriptor = {}
      descriptor[prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[prop] = this.value
      validator.validate(model).then(() => {
        this.validateState = 'success'
        this.validateMessage = ''
        callback(this.validateMessage)
      }).catch(({ errors, fields }) => {
        this.validateState = 'error'
        this.validateMessage = errors[0].message || ''
        callback(this.validateMessage)
      });
    },
    resetField () {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
      this.$emit('input', this.initialValue)
    },
    /* 获取表单数据 */
    getValue () {
      let name = this.attrs.name || this.attrs.var_name
      return {
        name: name,
        value: this.value
      }
    }
  },
  beforeDestroy () {
    this.form && this.form.fields.splice(this.form.fields.indexOf(this), 1)
  }
}
</script>

<style lang="less">
@selectdateCls: r--selectdate;

.@{selectdateCls} {
  position: relative;
  &-inner {
    border-bottom: 1px solid #d8d9dc;
    padding-right: 15px;
    height: 46px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
  }
  &-mode-to-top {
    margin-top: 20px;
  }
  &-mode-to-top&&-focused &-inner,
  &-mode-to-top&:not(&-empty) &-inner {
    padding-top: 20px;
  }
  &-mode-to-top&&-focused &-label,
  &-mode-to-top&:not(&-empty) &-label {
    position: absolute;
    top: 5px;
    font-size: 12px;
    color: #bdbdbd;
  }
  &-mode-to-top &-label {
    font-size: 16px;
    color: #bdbdbd;
  }
  &-mode-to-top &-select {
    font-size: 16px;
    line-height: 21px;
    color: #757575;
  }
  &-mode-default &-label {
    font-size: 14px;
    color: #333;
  }
  &-mode-default &-select {
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  &-label-right &-label {
    text-align: right;
    padding-right: 10px;
  }
  &-label-top {
    padding-top: 14px;
  }
  &-label-top &-label {
    position: absolute;
    top: 0;
    z-index: 1;
  }
  &-label {
    line-height: 1;
    box-sizing: border-box;
    white-space: nowrap;
    padding-right: 10px;
    transition: all 0.3s ease-out;
  }
  &-content {
    box-sizing: border-box;
    line-height: 1;
    display: flex;
    flex: 1;
    align-items: center;
    position: relative;
  }
  &-select {
    line-height: 1;
    font-size: 14px;
    color: #333;
    flex: 1;
    display: flex;
    align-items: center;
    padding: 0 10px 0 0px;
  }
  &-placeholder &-select {
    color: #c5c8ce;
  }
  &-readonly &-select {
    color: #999;
  }
  &-text-right &-select {
    justify-content: flex-end;
  }
  &-text-center &-select {
    justify-content: center;
  }
  &-arrow-right {
    line-height: 1;
  }
  &-unit {
    font-size: 12px;
    line-height: 1;
    padding-left: 5px;
  }
  &-error &-inner {
    border-color: #ed4014;
  }
  &-error-tip {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    line-height: 1;
    padding-top: 6px;
    font-size: 12px;
    color: #ed4014;
    z-index: 1;
  }
}
</style>
