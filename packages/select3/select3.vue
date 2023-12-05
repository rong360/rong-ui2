<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle"
             v-if="$slots.label || conf.title">
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
        <div :class="selectCls">
          <div v-for="(item, index) in conf.data"
               :key="index"
               :class="[selectOptionCls, {active: index == selectedIndex}]"
               @click="onSelect(item, index, $event)">{{item.text}}</div>
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
    <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage)"
         :class="errorCls">{{validateMessage}}</div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import { oneOf } from '../_utils/assist.js'
import AsyncValidator from 'async-validator'
import Render from '../base/render'
const { name, class: prefixCls } = createNamespace('select3')

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
    mode: {
      type: String
    },
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
    },
    "value": function (val) {
      this.validateState = ''
      this.validateMessage = ''
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
          [`${prefixCls}-disabled`]: !!this.conf.disabled
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
    onSelect (item, index, e) {
      let selectedOption = this.conf.data[index]
      this.selectedIndex = index;
      this.setCurrentValue(selectedOption.value)
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
