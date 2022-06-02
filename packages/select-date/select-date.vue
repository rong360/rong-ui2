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
      <div :class="contentCls">
        <DatePicker v-bind="conf"
                    @onconfirm="onConfirm"
                    :class="selectCls"
                    ref="datePicker"></DatePicker>
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
    <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage)"
         :class="errorCls">{{validateMessage}}</div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import { oneOf } from '../_utils/assist.js'
import AsyncValidator from 'async-validator'
import DatePicker from '../date-picker/date-picker'
import Render from '../base/render'
const { name, class: prefixCls } = createNamespace('select-date')

export default {
  name,
  // 兼容旧版attrs传参方式
  props: {
    attrs: {
      type: Object,
      default () {
        return {}
      }
    },
    value: [String, Number],
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
    // v1.2.2
    startYear: {
      type: [Number, String],
      default: '',
      validator: function (value) {
        return !isNaN(value)
      }
    },
    // v1.2.2
    endYear: {
      type: [Number, String],
      default: '',
      validator: function (value) {
        return !isNaN(value)
      }
    },
    // v1.2.2
    offsetYear: {
      type: [Number, String],
      default: 0,
      validator: function (value) {
        return !isNaN(value)
      }
    },
    // v1.2.2
    yearsLength: {
      type: [Number, String],
      default: 10,
      validator: function (value) {
        return !isNaN(value)
      }
    },
    // v1.2.2
    columnsOrder: {
      type: Array,
      default () {
        return ['year', 'month', 'day']
      }
    },
    // v1.2.2
    language: {
      type: String,
      default: 'zh' // 中文 'zh'、 英文 'en'、 印尼 'id'
    },
    // v1.2.2
    placeholder: {
      type: String,
      default: '请选择'
    },
    // v1.2.2
    textFormat: {
      type: [String, Function],
      default: 'yyyy/mm/dd'
    },
    // v1.2.2
    valueFormat: {
      type: [String, Function],
      default: 'yyyy/mm/dd'
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
    },
    // v1.1.2
    required: {
      type: Boolean,
      default: true
    },
    // 自定义class v1.2.2
    className: String
  },
  data () {
    return {
      initialValue: this.value,
      currentValue: this.value,
      validateState: '',
      validateMessage: '',
      validateDisabled: false
    }
  },
  inject: {
    form: { default: null }
  },
  watch: {
    "value": function (val) {
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
      this.setCurrentValue(val)
    }
  },
  components: {
    DatePicker,
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
          [`${prefixCls}-placeholder`]: this.currentValue == ''
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
      let defaultRules = [{ required: true, message: `${this.conf.title}不能为空` }]
      let rules = this.conf.rules || defaultRules
      return [].concat(rules)
    }
  },
  mounted () {
    this.form && this.form.fields.push(this)
  },
  methods: {
    showPicker () {
      this.$refs.datePicker.showPicker()
    },
    onConfirm (date) {
      this.setCurrentValue(date.value)
      this.$emit("on-confirm", date);
      this.validateState = ''
      this.validateMessage = ''
      this.validateDisabled = true
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
