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
        <input :class="inputCls"
               :value="currentValue"
               :type="inputType"
               :pattern="inputPattern"
               :name="conf.name"
               :maxlength="conf.maxlength"
               :disabled="conf.disabled"
               :readonly="!!conf.readonly"
               :autofocus="conf.autofocus"
               :placeholder="placeholderText"
               autocomplete="off"
               spellcheck="false"
               ref="input"
               @blur="onFieldBlur"
               @change="onFieldChange"
               @input="onFieldInput"
               @focus="onFieldFocus"
               @keyup="onFieldKeyup"
               @keyup.enter="onFieldEnter"
               @keydown="onFieldKeydown"
               @keydown.delete="onFieldKeydownDelete"
               @keypress="onFieldKeypress" />
        <div v-if="showEditIcon"
             class="input-edit"
             :class="inputCls"><span class="placeholder">{{currentValue}}</span><span class="edit-icon"></span></div>
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && isErrorAtPlaceholder"
             :class="errorCls2">{{validateMessage}}</div>
        <a v-show="showClear"
           :class="clearCls"
           @click.prevent.stop="onClear"
           ref="clear">
          <slot name="clear"><svg width="14px"
                 height="14px"
                 :style="clearStyle"
                 viewBox="0 0 14 14"
                 version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 xmlns:xlink="http://www.w3.org/1999/xlink">
              <g stroke="none"
                 stroke-width="1"
                 fill="none"
                 fill-rule="evenodd">
                <g transform="translate(-346.000000, -238.000000)"
                   :fill="clearStyle.color">
                  <g transform="translate(346.000000, 238.000000)">
                    <path d="M7,0 C3.13354657,0 0,3.13354657 0,7 C0,10.8664534 3.13354657,14 7,14 C10.8664534,14 14,10.8664534 14,7 C14,3.13354657 10.8664534,0 7,0 Z M9.97021324,4.68998284 L7.66019608,7 L9.97021324,9.31001716 C10.1500343,9.49390441 10.1472721,9.78900245 9.96331618,9.97021324 C9.78215686,10.1472721 9.49115931,10.1472721 9.31001716,9.97021324 L7,7.66019608 L4.68998284,9.97021324 C4.50609559,10.1500343 4.21099755,10.1472721 4.02978676,9.96331618 C3.85272794,9.78215686 3.85272794,9.49115931 4.02978676,9.31001716 L6.33980392,7 L4.02978676,4.68998284 C3.84996569,4.50609559 3.85272794,4.21099755 4.03668382,4.02978676 C4.21784314,3.85272794 4.50884069,3.85272794 4.68998284,4.02978676 L7,6.33980392 L9.31001716,4.02978676 C9.49390441,3.84996569 9.78900245,3.85272794 9.97021324,4.03668382 C10.1472721,4.21784314 10.1472721,4.50884069 9.97021324,4.68998284 Z"
                          id="Fill-1"></path>
                  </g>
                </g>
              </g>
            </svg></slot>
        </a>
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
      <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && !isErrorAtPlaceholder && !this.showEmailPan"
           :class="errorCls">{{validateMessage}}</div>
    </div>
    <div v-if="showEmailPanel"
         :class="emailPanel">
      <div v-for="(emailSuffix, index) in filteredEmailList"
           @click="setEmail"
           :key="index"
           :class="emailPanelItem"
           v-html="(currentValue.split('@')[0] + '@' + emailSuffix).replace(currentValue, function(text){ return `<font>${text}</font>` })"></div>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import { oneOf } from '../_utils/assist.js'
import AsyncValidator from 'async-validator'
import Render from '../base/render'
const { name, class: prefixCls } = createNamespace('input')

function telephoneClearNonNumbers (str) {
  // 先把非数字的都替换掉，除了数字和.
  str = str.replace(/[^\d]/g, "")
  return str
}

function IDCardClearNonNumbers (str) {
  // 身份证不超过15或18位数字，最后一位是X或者x，超过18截掉
  if (str.length > 18) {
    str = str.substr(0, 18)
  }
  if (str.length < 15 || str.length > 15 && str.length < 18) {
    str = str.replace(/[^\d]/g, "")
  }
  if (str.length == 15 || str.length == 18) {
    let str1 = str.substr(0, str.length - 1)
    let str2 = str.substr(str.length - 1, 1)
    str1 = str1.replace(/[^\d]/g, "")
    str2 = str2.replace(/[^\dXx]/g, "")
    str = str1 + str2
  }
  return str
}
function IDCardVerify (idcard) {
  let pass = false;
  let area = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  }
  let Y, JYM, ereg;
  let S, M;
  let idcardArray = [];
  idcardArray = idcard.split("");
  if (area[parseInt(idcard.substr(0, 2))] == null) {
    return false;
  }
  switch (idcard.length) {
    case 15:
      pass = false;
      break;
    case 18:
      if (parseInt(idcard.substr(6, 4)) % 4 == 0 || (parseInt(idcard.substr(6, 4)) % 100 == 0 && parseInt(idcard.substr(6, 4)) % 4 == 0)) {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|[1-2][0-9]))[0-9]{3}[0-9Xx]$/; // 闰年出生日期的合法性正则表达式
      } else {
        ereg = /^[1-9][0-9]{5}(19|20)[0-9]{2}((01|03|05|07|08|10|12)(0[1-9]|[1-2][0-9]|3[0-1])|(04|06|09|11)(0[1-9]|[1-2][0-9]|30)|02(0[1-9]|1[0-9]|2[0-8]))[0-9]{3}[0-9Xx]$/; // 平年出生日期的合法性正则表达式
      }
      if (ereg.test(idcard)) {
        S = (parseInt(idcardArray[0]) + parseInt(idcardArray[10])) * 7 + (parseInt(idcardArray[1]) + parseInt(idcardArray[11])) * 9 + (parseInt(idcardArray[2]) + parseInt(idcardArray[12])) * 10 + (parseInt(idcardArray[3]) + parseInt(idcardArray[13])) * 5 + (parseInt(idcardArray[4]) + parseInt(idcardArray[14])) * 8 + (parseInt(idcardArray[5]) + parseInt(idcardArray[15])) * 4 + (parseInt(idcardArray[6]) + parseInt(idcardArray[16])) * 2 + parseInt(idcardArray[7]) * 1 + parseInt(idcardArray[8]) * 6 + parseInt(idcardArray[9]) * 3;
        Y = S % 11;
        M = "F";
        JYM = "10X98765432";
        M = JYM.substr(Y, 1);
        if (M.toLowerCase() == idcardArray[17].toLowerCase()) {
          pass = true;
        } else {
          pass = false;
        }
      } else {
        pass = false;
      }
      break;
    default:
      pass = false;
      break;
  };

  return pass;
}

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
    // input类型 v1.2.2
    type: String,
    // v1.2.2
    maxlength: [String, Number],
    // v1.2.2
    disabled: [String, Boolean],
    // v1.2.2
    readonly: [String, Number, Boolean],
    // v1.2.2
    autofocus: [String, Boolean],
    // input前插槽 v1.2.2
    prepend: [String, Object, Function],
    // input后插槽 v1.2.2
    append: [String, Object, Function],
    // v1.2.2 兼容旧版本，新版本用append替换
    unit: String,
    // 邮箱后缀列表, 仅当type=email时有效 v1.2.2
    emailList: Array,
    // 小数点后保留位数 v1.2.2
    fixed: [String, Number],
    // 显示清空按钮 v1.2.2
    clearable: {
      type: Boolean,
      default: true
    },
    // input事件  v1.2.2
    onInput: Function,
    // blur事件  v1.2.2
    onBlur: Function,
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
    inputClearStyle: {
      type: Object
    },
    // 是否显示校验错误信息
    showMessage: {
      type: Boolean,
      default: true
    },
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
    className: String,
    // 显示可编辑icon v1.2.1
    showEdit: Boolean
  },
  data () {
    let ua = navigator.userAgent
    let isAndroid = !!ua.match(/(Android)\s+([\d.]+)/)
    return {
      initialValue: '',
      currentValue: this.value,
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      focused: false,
      isAndroid,
      isBackSpace: false, // 键盘后退键
      showEmailPan: false
    }
  },
  watch: {
    "value": function (val) {
      this.setCurrentValue(val)
    }
  },
  inject: {
    form: { default: null }
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
      return this.errorAtPlaceholder || this.form && this.form.errorAtPlaceholder || false
    },
    isRequired () {
      return this.conf.required && this.fieldRules.length > 0
    },
    wrapCls () {
      let labelPosition = this.conf.labelPosition || this.form && this.form.labelPosition || 'left'
      let textPosition = this.conf.textPosition || this.form && this.form.textPosition || 'left'
      let mode = this.mode || this.form && this.form.mode || 'default'
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
          [`${prefixCls}-error`]: this.validateState == 'error' && !this.showEmailPan,
          [`${prefixCls}-show-clear`]: this.showClear,
          [`${prefixCls}-hidden`]: this.conf.type == 'hidden',
          [`${prefixCls}-email`]: this.conf.type == 'email',
          [`${prefixCls}-error-at-placeholder`]: this.isErrorAtPlaceholder,
          [`${prefixCls}-readonly`]: !!this.conf.readonly,
          [`${prefixCls}-disabled`]: !!this.conf.disabled,
          [`${prefixCls}-show-edit`]: this.showEdit
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
    placeholderText () {
      return this.conf.placeholder || (this.form && this.form.placeholder) || ''
    },
    clearStyle () {
      let style = { color: '#C8C7CC' }
      return this.inputClearStyle || (this.form && this.form.inputClearStyle) || style
    },
    contentCls () {
      return `${prefixCls}-content`
    },
    inputCls () {
      return `${prefixCls}-input`
    },
    clearCls () {
      return `${prefixCls}-clear`
    },
    unitCls () {
      return `${prefixCls}-unit`
    },
    showClear () {
      return this.conf.clearable && this.focused && this.currentValue.length > 0
    },
    errorCls () {
      return `${prefixCls}-error-tip`
    },
    errorCls2 () {
      return `${prefixCls}-error-tip2`
    },
    fieldRules () {
      let defaultRules = [{ required: true, message: `${this.conf.title}不能为空` }]
      if (this.conf.type == 'IDCard') {
        defaultRules.push({
          validator (rule, value, callback) {
            if (!IDCardVerify(value)) {
              return new Error('身份证格式不正确')
            }
            callback()
          },
          trigger: 'blur'
        })
      } else if (this.conf.type == 'email') {
        defaultRules.push({ type: "email", message: "邮箱格式不正确", trigger: "blur" })
      }
      let rules = this.conf.rules || defaultRules
      return [].concat(rules)
    },
    inputType () {
      let type = this.conf.type || 'text' // 'tel', 'number', 'text', 'IDCard'
      if (this.conf.type == 'IDCard' && !this.conf.formatter) {
        type = 'text'
      }
      return type
    },
    inputPattern () {
      return this.conf.type == 'number' ? 'number' : ''
    },
    emailPanel () {
      return `${prefixCls}-email-panel`
    },
    emailPanelItem () {
      return `${prefixCls}-email-panel--item`
    },
    filteredEmailList () {
      let emailList = this.conf.emailList || [],
        emailSuffix = this.currentValue.split('@')[1],
        arr = []
      if (!emailSuffix && this.currentValue.length) {
        return emailList
      }
      for (let i = 0; i < emailList.length; i++) {
        let email = emailList[i].replace('@', '')
        if (email.indexOf(emailSuffix) > -1) {
          arr.push(email)
        }
      }
      return arr
    },
    showEmailPanel () {
      let currEmailSuffix = String(this.currentValue).split("@")[1]
      return this.conf.type == 'email' &&
        this.showEmailPan &&
        (this.filteredEmailList.length > 1 ||
          (this.filteredEmailList.length == 1 && this.filteredEmailList[0] != currEmailSuffix))
    },
    showEditIcon () {
      return this.conf.showEdit && !this.focused && this.currentValue != ''
    }
  },
  mounted () {
    this.form && this.form.fields.push(this)
    this.initialValue = this.currentValue
  },
  methods: {
    getFilterRules (trigger) {
      return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) != -1)
    },
    onFieldFocus (e) {
      if (this.conf.readonly) return
      this.focused = true
      if (this.conf.type == 'email') this.showEmailPan = true
      if (!('prevValue' in e.target)) e.target.prevValue = e.target.value
      this.$emit('on-focus', e)
      // e.target.scrollIntoView()
    },
    onFieldInput (e) {
      let iptValue = e.target.value
      this.validateState = ''
      this.validateMessage = ''
      if (this.conf.type == 'number') {
        let iptPrevValue = e.target.prevValue
        // 修复input 属性为 number，maxlength不起作用
        if (this.conf.maxlength && iptValue.length > this.conf.maxlength) {
          e.target.value = iptValue.slice(0, this.conf.maxlength)
        }
        // 限制小数位数
        let dotPos = iptValue.indexOf('.')
        if (dotPos > -1) {
          e.target.value = this.conf.fixed > 0 ? iptValue.substring(0, dotPos + this.conf.fixed + 1) : iptValue.substring(0, dotPos)
        }
        // 解决ios输入非数字时value清空问题
        if (iptValue == '' && iptPrevValue != '' && !this.isBackSpace) {
          e.target.value = iptPrevValue
        } else if (iptValue == '' && iptPrevValue == '') { // 第一个code为非数字
          e.target.value = ''
        }
        e.target.prevValue = e.target.value
      } else if (this.conf.type == 'tel') {
        e.target.value = telephoneClearNonNumbers(iptValue)
      } else if (this.conf.type == 'IDCard') {
        e.target.value = IDCardClearNonNumbers(iptValue)
      }
      this.setCurrentValue(e.target.value, { from: 'input' })
      this.$emit('on-input', e, this)
      this.onInput && this.onInput(e, this)
    },
    onFieldChange (e) {
      this.$emit('on-change', e)
    },
    onFieldBlur (e) {
      if (this.conf.readonly || this.conf.disabled) return

      this.blurTimer = setTimeout(() => {
        this.focused = false

        this.setCurrentValue(e.target.value)

        if (this.conf.type == 'email') this.showEmailPan = false

        if (!this.validateDisabled) this.validate('blur')
        this.validateDisabled = false

        this.$emit('on-blur', e)
        this.onBlur && this.onBlur(e, this)
      }, 200)
    },
    onFieldKeyup (e) {
      this.$emit('on-keyup', e)
    },
    onFieldKeydown (e) {
      this.isBackSpace = false
      this.$emit('on-keydown', e)
    },
    onFieldKeydownDelete (e) {
      this.isBackSpace = true
    },
    onFieldKeypress (e) {
    },
    onFieldEnter (e) {
      this.$emit('on-enter', e)
    },
    onClear (e) {
      if (this.blurTimer) clearTimeout(this.blurTimer)
      this.setCurrentValue('')
      this.focus()
      this.$emit('on-clear', e)
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

      let hasMaskCode = this.initialValue.indexOf('*') > -1 // 掩码
      if (this.conf.readonly || hasMaskCode && this.initialValue == this.currentValue) {
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
    setEmail (e) {
      this.setCurrentValue(e.target.innerText)
    },
    // 手动聚焦输入框
    focus () {
      this.$refs.input.focus()
    },
    setCurrentValue (value, options = {}) {
      const { validateDisabled } = options
      if (value === this.currentValue) return
      if (validateDisabled) this.validateDisabled = true
      this.currentValue = value
      this.$emit('input', value, this)
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
