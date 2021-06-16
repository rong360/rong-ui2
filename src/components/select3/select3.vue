<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle">{{attrs.title}}</label>
      <slot name="prepend"></slot>
      <div :class="contentCls">
        <div :class="selectCls">
          <div v-for="(item, index) in attrs.data"
               :class="[selectOptionCls, {active: index == selectedIndex}]"
               @click="onSelect(item, index, $event)">{{item.text}}</div>
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
    <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage)"
         :class="errorCls">{{validateMessage}}</div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import { oneOf } from '../../utils/assist.js'
const prefixCls = 'r--select3'

export default {
  name: 'Select3',
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
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    },
    mode: {
      type: String
    },
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
    }
  },
  computed: {
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
    contentCls () {
      return `${prefixCls}-content`
    },
    selectCls () {
      return `${prefixCls}-select`
    },
    unitCls () {
      return `${prefixCls}-unit`
    },
    selectOptionCls () {
      return `${prefixCls}-select--option`
    },
    errorCls () {
      return `${prefixCls}-error-tip`
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
    onSelect (item, index, e) {
      let selectedOption = this.attrs.data[index]
      this.selectedIndex = index;
      this.$emit('input', selectedOption.value)
      this.$emit("on-confirm", selectedOption, e);
      this.validateState = ''
      this.validateMessage = ''
      this.$nextTick(() => {
        this.validate('select')
      })
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
@selectCls: r--select3;

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
    flex: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  &-select--option {
    line-height: 1;
    font-size: 12px;
    color: #333333;
    background: #F2F2F2;
    height: 24px;
    line-height: 24px;
    padding: 0 16px;
    border-radius: 12px;
    position: relative;
    margin-right: 10px;
    &.active {
      background: #E7F1FF;
      color: #4084E8;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 200%;
        height: 200%;
        transform: scale(0.5);
        transform-origin: left top;
        border: 1px solid #4084E8;
        border-radius: 24px;
      }
    }
    &:last-child {
      margin-right: 0;
    }
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
  &-children {
    padding: 0px 0 0 15px;
  }
}
</style>
