<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle"
             @click="showPicker">{{attrs.title}}</label>
      <slot name="prepend"></slot>
      <div :class="contentCls"
           @click="showPicker">
        <div :class="selectCls">{{selectedOption.text || placeholderText}}</div>
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && isErrorAtPlaceholder"
             :class="errorCls2">{{validateMessage}}</div>
        <div :class="arrowCls">
          <slot name="arrow-icon">
            <svg width="6px"
                 height="10px"
                 :style="arrowStyle"
                 viewBox="0 0 6 10"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none"
                 stroke-width="1"
                 fill="none"
                 fill-rule="evenodd">
                <g transform="translate(-350.000000, -20.000000)"
                   :fill="arrowStyle.color || '#C8C7CC'">
                  <g>
                    <g transform="translate(346.000000, 18.000000)">
                      <g transform="translate(7.000000, 7.000000) rotate(-270.000000) translate(-7.000000, -7.000000) translate(2.750000, 4.500000)">
                        <path d="M6.53188022,3.0259328 L3.02129527,6.5321515 C2.73046889,6.82261617 2.25894616,6.82261617 1.96811978,6.5321515 C1.67729341,6.24168683 1.67729341,5.77075056 1.96811978,5.48028589 L4.95211699,2.5 L1.96811978,-0.480285891 C1.67729341,-0.770750558 1.67729341,-1.24168683 1.96811978,-1.5321515 C2.25894616,-1.82261617 2.73046889,-1.82261617 3.02129527,-1.5321515 L6.53188022,1.9740672 C6.82270659,2.26453186 6.82270659,2.73546814 6.53188022,3.0259328 Z"
                              fill-rule="nonzero"
                              transform="translate(4.250000, 2.500000) rotate(-90.000000) translate(-4.250000, -2.500000) "></path>
                      </g>
                    </g>
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
    <div :class="wrapChildrenCls"
         v-if="children && children.length">
      <template v-for="(child,index) in children">
        <component :is="child.componentType"
                   :attrs="child"
                   v-model="child.value"
                   :ref="child.name"
                   :key="child.name"></component>
      </template>
    </div>
    <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && !isErrorAtPlaceholder"
         :class="errorCls">{{validateMessage}}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import Picker from 'better-picker'
import { oneOf } from '../../utils/assist.js'
const prefixCls = 'r--select'

export default {
  name: 'Select',
  props: {
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    value: {
      type: [String, Number],
      default: ''
    },
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
    cancelBtnText: String,
    confirmBtnText: String,
    mode: {
      type: String
    },
    // 错误信息显示在placeholder位置
    errorAtPlaceholder: Boolean,
    // v1.1.2
    required: Boolean,
    // 自定义class v1.1.3
    className: String
  },
  data () {
    return {
      initialValue: '',
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      selectedIndex: -1
    }
  },
  inject: {
    form: { default: null }
  },
  watch: {
    "attrs.data": function () {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
      this.removePicker()
    }
  },
  computed: {
    isErrorAtPlaceholder () {
      return this.errorAtPlaceholder || this.form && this.form.errorAtPlaceholder || false
    },
    isRequired () {
      let required
      if (typeof this.attrs.required != 'undefined') {
        required = this.attrs.required
      } else if (this.required == true) {
        required = true
      } else {
        required = this.fieldRules.some(item => item.required == true)
      }
      return required
    },
    wrapCls () {
      let labelPosition = this.labelPosition || this.attrs.labelPosition || this.form && this.form.labelPosition || 'right'
      let textPosition = this.textPosition || this.attrs.textPosition || this.form && this.form.textPosition || 'left'
      let mode = this.mode || this.form && this.form.mode || 'default'
      let className = this.className || this.attrs.className

      return [
        this.form && 'form-item',
        `${prefixCls}`,
        `${prefixCls}-label-${labelPosition}`,
        `${prefixCls}-text-${textPosition}`,
        `${prefixCls}-mode-${mode}`,
        className,
        {
          [`${prefixCls}-focused`]: this.focused,
          [`${prefixCls}-empty`]: this.value == '',
          [`${prefixCls}-error`]: this.validateState == 'error',
          [`${prefixCls}-readonly`]: !!this.attrs.readonly,
          [`${prefixCls}-placeholder`]: this.value == '',
          [`${prefixCls}-error-at-placeholder`]: this.isErrorAtPlaceholder,
          [`${prefixCls}-required`]: this.isRequired
        }
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    wrapChildrenCls () {
      return `${prefixCls}-children`
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
    selectedOption () {
      let data = this.attrs.data || []
      let selectedOption = {}
      this.selectedIndex = -1
      for (var i = 0; i < data.length; i++) {
        if (data[i].value == this.value) {
          selectedOption = data[i]
          this.selectedIndex = i
          break
        }
      }
      return selectedOption
    },
    placeholderText () {
      return this.attrs.placeholder || this.placeholder || (this.form && this.form.selectPlaceholder) || ''
    },
    arrowStyle () {
      let style = { color: '#666', width: '0.32rem' }
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
    errorCls2 () {
      return `${prefixCls}-error-tip2`
    },
    fieldRules () {
      let defaultRules = [{ required: true, message: `${this.attrs.title}不能为空` }]
      let rules = this.attrs.rules || this.rules || defaultRules
      return [].concat(rules)
    },
    children () {
      return this.selectedOption.children || []
    }
  },
  mounted () {
    this.form && this.form.fields.push(this)
    this.initialValue = this.value
  },
  methods: {
    showPicker (e) {
      let pickerData = this.attrs.data || [],
        selectedIndex = this.selectedIndex > -1 ? this.selectedIndex : 0,
        pickerTitle = this.attrs.pickerTitle || '',
        cancelBtnText = this.attrs.cancelBtnText || this.cancelBtnText || (this.form && this.form.selectCancelBtnText),
        confirmBtnText = this.attrs.confirmBtnText || this.confirmBtnText || (this.form && this.form.selectConfirmBtnText)
      if (this.attrs.readonly || this.attrs.disabled) return
      if (!this.picker) {
        this.picker = new Picker({
          data: [pickerData],
          selectedIndex: [selectedIndex],
          title: pickerTitle
        })
        cancelBtnText && (this.picker.cancelEl.innerHTML = cancelBtnText)
        confirmBtnText && (this.picker.confirmEl.innerHTML = confirmBtnText)
        this.picker.on('picker.change', (index, selectedIndex) => { })
        this.picker.on('picker.select', (selectedVal, selectedIndex) => {
          let selectedOption = this.attrs.data[selectedIndex]
          this.selectedIndex = selectedIndex;
          this.$emit('input', selectedOption.value)
          this.$emit("on-confirm", selectedOption);
          this.validateState = ''
          this.validateMessage = ''
          this.validateDisabled = true
          this.$nextTick(() => {
            this.validate('select')
          })
        })
        this.picker.on('picker.cancel', () => { })

        this.$once('hook:beforeDestroy', () => {
          this.removePicker()
        })
      }
      this.picker.show()
    },
    getFilterRules (trigger) {
      return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) != -1)
    },
    validate (trigger, callback = function () { }) {
      let rules = this.getFilterRules(trigger)

      if (!this.isRequired) {
        this.validateState = ''
        callback()
        return true
      }

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
      this.removePicker()
    },
    removePicker () {
      if (this.picker && this.picker.pickerEl) {
        this.picker.pickerEl.parentNode.removeChild(this.picker.pickerEl);
        this.picker = null
      }
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
@selectCls: r--select;

.@{selectCls} {
  position: relative;
  &-inner {
    border-bottom: 1px solid #f2f2f4;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding-right: 15px;
    position: relative;
  }
  &-mode-default &-inner {
    padding-top: 15px;
    padding-bottom: 15px;
  }
  &-mode-to-top &-inner {
    height: 46px;
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
    color: #181c48;
  }
  &-mode-default &-label {
    font-size: 14px;
    color: #333;
    line-height: 20px;
  }
  &-mode-default&-text-left &-label {
    margin-right: 23px;
  }
  &-mode-default &-select {
    font-size: 14px;
    line-height: 20px;
  }
  &-label-right &-label {
    text-align: right;
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
    margin-right: 10px;
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
    z-index: 2;
    box-sizing: border-box;
  }
  &-placeholder &-select {
    color: #c8c7cc;
    font-weight: normal;
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
  &-error&-mode-default &-inner {
    margin-bottom: 20px;
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
  &-error-tip2 {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    line-height: 1;
    font-size: 12px;
    color: #ed4014;
    z-index: 1;
    transform: translateY(-50%);
    box-sizing: border-box;
  }
  &-text-right &-error-tip2 {
    text-align: right;
    padding-right: 15px;
  }
  &-error-at-placeholder&-error &-select {
    color: transparent;
  }
  &-children {
    padding: 0px 0 0 15px;
  }
}
</style>
