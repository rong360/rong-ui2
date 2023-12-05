<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle"
             v-if="$slots.label || conf.title"
             @click="showPicker">
        <slot name="label">{{conf.title}}</slot>
      </label>
      <div :class="prependCls"
           v-if="$slots.prepend || conf.prepend">
        <slot name="prepend">
          <Render v-if="typeof conf.prepend == 'function'"
                  :render="conf.prepend"></Render>
          <div class="prepend"
               v-else
               v-html="conf.prepend"></div>
        </slot>
      </div>
      <div :class="contentCls"
           @click="showPicker">
        <div :class="selectCls">{{selectedOption.text || placeholderText}}</div>
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && isErrorAtPlaceholder"
             :class="errorCls2">{{validateMessage}}</div>
        <div :class="arrowCls">
          <slot name="arrow-icon">
            <svg width="1em"
                 height="1em"
                 viewBox="0 0 6 10">
              <g stroke="none"
                 stroke-width="1"
                 fill="none"
                 fill-rule="evenodd">
                <g transform="translate(-350.000000, -20.000000)"
                   fill="currentColor">
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
      <div v-if="conf.unit"
           :class="unitCls">{{conf.unit}}</div>
      <div :class="appendCls"
           v-if="$slots.append || conf.append">
        <slot name="append">
          <Render v-if="typeof conf.append == 'function'"
                  :render="conf.append"></Render>
          <div class="append"
               v-else
               v-html="conf.append"></div>
        </slot>
      </div>
    </div>
    <div :class="wrapChildrenCls"
         v-if="children && children.length">
      <template v-for="(child) in children">
        <component :is="child.componentType"
                   v-bind="child"
                   v-model="child.value"
                   :attrs="child"
                   :ref="child.name"
                   :key="child.name"></component>
      </template>
    </div>
    <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && !isErrorAtPlaceholder"
         :class="errorCls">{{validateMessage}}</div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import { oneOf } from '../_utils/assist.js'
import AsyncValidator from 'async-validator'
import Picker from 'better-picker'
import Render from '../base/render'
const { name, class: prefixCls } = createNamespace('select')

export default {
  name,
  props: {
    // 兼容旧版attrs传参方式
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
    // v1.2.2
    title: String,
    // v1.2.2
    name: String,
    // v1.2.2
    disabled: [String, Boolean],
    // input前插槽 v1.2.2
    prepend: [String, Object, Function],
    // input后插槽 v1.2.2
    append: [String, Object, Function],
    // v1.2.2 兼容旧版本，新版本用append替换
    unit: String,
    // 列表数据 v1.2.2
    data: {
      type: Array,
      default: () => []
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
    cancelBtnText: String,
    confirmBtnText: String,
    mode: {
      type: String
    },
    // 错误信息显示在placeholder位置
    errorAtPlaceholder: Boolean,
    // v1.1.2
    required: {
      type: Boolean,
      default: true
    },
    // 自定义class v1.1.3
    className: String
  },
  data () {
    return {
      initialValue: this.value,
      currentValue: this.value,
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
    },
    "value": function (val) {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
      this.removePicker()
      this.setCurrentValue(val)
    }
  },
  components: {
    Render
  },
  computed: {
    // 合并attrs参数到props，兼容旧版attrs传参方式
    conf () {
      let attrs = this.$props.attrs
      let props = {}
      for (let key in this.$props) {
        if (key !== 'attrs') {
          props[key] = key in attrs ? attrs[key] : this.$props[key]
        }
      }
      return props
    },
    isErrorAtPlaceholder () {
      return this.conf.errorAtPlaceholder || this.form && this.form.errorAtPlaceholder || false
    },
    isRequired () {
      return this.conf.required && this.fieldRules.length > 0
    },
    wrapCls () {
      let labelPosition = this.conf.labelPosition || this.form && this.form.labelPosition || 'right'
      let textPosition = this.conf.textPosition || this.form && this.form.textPosition || 'left'
      let mode = this.conf.mode || this.form && this.form.mode || 'default'
      let className = this.conf.className

      return [
        this.form && 'form-item',
        `${prefixCls}`,
        `${prefixCls}-label-${labelPosition}`,
        `${prefixCls}-text-${textPosition}`,
        `${prefixCls}-mode-${mode}`,
        className,
        this.isRequired ? `${prefixCls}-required` : `${prefixCls}-not-required`,
        {
          [`${prefixCls}-focused`]: this.focused,
          [`${prefixCls}-empty`]: this.currentValue == '',
          [`${prefixCls}-error`]: this.validateState == 'error',
          [`${prefixCls}-disabled`]: !!this.conf.disabled,
          [`${prefixCls}-placeholder`]: this.currentValue == '',
          [`${prefixCls}-error-at-placeholder`]: this.isErrorAtPlaceholder
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
      if (this.conf.labelWidth || this.conf.labelWidth == 0) {
        style.width = this.labelWidth
      } else if (this.form && (this.form.labelWidth || this.form.labelWidth == 0)) {
        style.width = this.form.labelWidth
      }
      return style
    },
    prependCls () {
      return `${prefixCls}-prepend`
    },
    appendCls () {
      return `${prefixCls}-append`
    },
    selectedOption () {
      let data = this.conf.data || []
      let selectedOption = {}
      this.selectedIndex = -1
      for (let i = 0; i < data.length; i++) {
        if (data[i].value == this.currentValue) {
          selectedOption = data[i]
          this.selectedIndex = i
          break
        }
      }
      return selectedOption
    },
    placeholderText () {
      return this.conf.placeholder || (this.form && this.form.selectPlaceholder) || ''
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
      let defaultRules = [{ required: true, message: `${this.conf.title}不能为空` }]
      let rules = this.conf.rules || defaultRules
      return [].concat(rules)
    },
    children () {
      return this.selectedOption.children || []
    }
  },
  mounted () {
    this.form && this.form.fields.push(this)
  },
  methods: {
    showPicker (e) {
      let pickerData = this.conf.data || [],
        selectedIndex = this.selectedIndex > -1 ? this.selectedIndex : 0,
        pickerTitle = this.conf.pickerTitle || '',
        cancelBtnText = this.conf.cancelBtnText || (this.form && this.form.selectCancelBtnText),
        confirmBtnText = this.conf.confirmBtnText || (this.form && this.form.selectConfirmBtnText)
      if (this.conf.disabled) return
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
          let selectedOption = this.conf.data[selectedIndex]
          this.selectedIndex = selectedIndex;
          this.setCurrentValue(selectedOption.value)
          this.$emit("on-confirm", selectedOption);
          this.validateState = ''
          this.validateMessage = ''
          this.validateDisabled = true
          this.$nextTick(() => {
            this.validate('')
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

      if (this.conf.disabled) {
        this.validateState = 'success'
        this.validateMessage = ''
        callback(this.validateMessage)
        return
      }

      let prop = this.conf.name || this.conf.title || 'prop'
      let descriptor = {}
      descriptor[prop] = rules
      const validator = new AsyncValidator(descriptor)
      let model = {}
      model[prop] = this.currentValue
      validator.validate(model, { first: true, suppressWarning: true, component: this }).then(() => {
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
      this.setCurrentValue(this.initialValue)
      this.removePicker()
    },
    removePicker () {
      if (this.picker && this.picker.pickerEl) {
        this.picker.pickerEl.parentNode.removeChild(this.picker.pickerEl);
        this.picker = null
      }
    },
    setCurrentValue (value) {
      if (value === this.currentValue) return
      this.currentValue = value
      this.$emit('input', value)
    },
    /* 获取表单数据 */
    getValue () {
      let name = this.conf.name || this.conf.title
      return {
        name: name,
        value: this.currentValue,
        title: this.conf.title
      }
    }
  },
  beforeDestroy () {
    this.form && this.form.fields.splice(this.form.fields.indexOf(this), 1)
  }
}
</script>
