<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle">{{attrs.title}}</label>
      <slot name="prepend"></slot>
      <div :class="contentCls">
        <input :class="inputCls"
               :value="value"
               :type="inputType"
               :pattern="inputPattern"
               :name="attrs.name"
               :maxlength="attrs.maxlength"
               :disabled="attrs.disabled"
               :readonly="!!attrs.readonly"
               :autofocus="attrs.autofocus"
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
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && isErrorAtPlaceholder"
             :class="errorCls2">{{validateMessage}}</div>
        <a v-show="showClear"
           :class="clearCls"
           @click.prevent.stop="onClear"
           ref="clear"><svg width="13px"
               height="13px"
               :style="clearStyle"
               viewBox="0 0 13 13"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none"
               stroke-width="1"
               fill="none"
               fill-rule="evenodd">
              <g transform="translate(-347.000000, -16.000000)"
                 :fill="clearStyle.color"
                 fill-rule="nonzero">
                <path d="M359.127301,19.2498723 C358.537222,18.2437191 357.756193,17.4627605 356.749987,16.8726113 C355.755019,16.2890502 354.673613,16 353.499991,16 C352.326369,16 351.241123,16.2824796 350.234952,16.8726113 C349.239967,17.4561724 348.462778,18.2437191 347.872682,19.2498723 C347.289173,20.2449454 347,21.326369 347,22.4999031 C347,23.6736134 347.282603,24.7587186 347.872682,25.7650303 C348.45619,26.7599449 349.239967,27.5436339 350.234952,28.1272126 C351.24114,28.7173618 352.326387,28.9999824 353.499991,28.9999824 C354.673596,28.9999824 355.755019,28.7107737 356.749987,28.1272126 C357.756175,27.5370634 358.543775,26.7599449 359.127301,25.7650303 C359.717397,24.7587186 360,23.6736134 360,22.4999031 C360,21.326369 359.710827,20.2449454 359.127301,19.2498723 Z M356.644682,24.862244 L355.847236,25.6446647 L353.500009,23.2823238 L351.1528,25.6446647 L350.355353,24.862244 L352.717623,22.4999031 L350.355353,20.1526586 L351.137756,19.3553177 L353.500009,21.7175 L355.847218,19.3553177 L356.644665,20.1526586 L354.282394,22.4999031 L356.644682,24.862244 Z"
                      id="Shape-Copy"></path>
              </g>
            </g>
          </svg></a>
      </div>
      <div v-if="attrs.unit"
           :class="unitCls">{{attrs.unit}}</div>
      <slot name="append"></slot>
      <transition name="fade"
                  mode="out-in">
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && !isErrorAtPlaceholder"
             :class="errorCls">{{validateMessage}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import AsyncValidator from 'async-validator'
import { oneOf } from '../../utils/assist.js'
const prefixCls = 'r--input'

function clearNonNumbers (str) {
  // 先把非数字的都替换掉，除了数字和.
  str = str.replace(/[^+-\d.]/g, "")
  // 有多个-时只保留第一个
  if (/^-/.test(str)) {
    str = str.replace(/-/g, '')
    str = '-' + str
  }
  // - 不能出现在非开头的位置
  if (str.indexOf('-') > 0) {
    str = str.replace(/-/g, '')
  }
  // 有多个.时截取第二个.之前的字符串
  let splitPointArr = str.split('.')
  if (splitPointArr.length >= 2) {
    str = splitPointArr.slice(0, 2).join('.')
  }
  return str
}

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
  var pass = false;
  var area = {
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
  var Y, JYM, ereg;
  var S, M;
  var idcardArray = [];
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
  name: 'Input',
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
    errorAtPlaceholder: Boolean
  },
  data () {
    let ua = navigator.userAgent
    let isAndroid = !!ua.match(/(Android)\s+([\d.]+)/)
    return {
      initialValue: '',
      prevValue: this.value || '',
      validateState: '',
      validateMessage: '',
      validateDisabled: false,
      focused: false,
      isAndroid,
      isBackSpace: false // 键盘后退键
    }
  },
  watch: {
    "value": function (value) {
      this.prevValue = value
    }
  },
  inject: {
    form: { default: null }
  },
  computed: {
    isErrorAtPlaceholder () {
      return this.errorAtPlaceholder || this.form && this.form.errorAtPlaceholder || false
    },
    wrapCls () {
      let labelPosition = this.labelPosition || this.form && this.form.labelPosition || 'left'
      let textPosition = this.textPosition || this.form && this.form.textPosition || 'left'
      let mode = this.mode || this.form && this.form.mode || 'default'

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
          [`${prefixCls}-show-clear`]: this.showClear,
          [`${prefixCls}-hidden`]: this.attrs.type == 'hidden',
          [`${prefixCls}-error-at-placeholder`]: this.isErrorAtPlaceholder
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
    placeholderText () {
      return this.attrs.placeholder || this.placeholder || (this.form && this.form.placeholder) || ''
    },
    clearStyle () {
      let style = { color: '#999999' }
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
      return this.focused && this.value.length > 0
    },
    errorCls () {
      return `${prefixCls}-error-tip`
    },
    errorCls2 () {
      return `${prefixCls}-error-tip2`
    },
    fieldRules () {
      let defaultRules = [{ required: true, message: `${this.attrs.title}不能为空` }]
      if (this.attrs.type == 'IDCard') {
        defaultRules.push({
          validator (rule, value, callback) {
            if (!IDCardVerify(value)) {
              return new Error('身份证格式不正确')
            }
            callback()
          },
          trigger: 'blur'
        })
      }
      let rules = this.attrs.rules || this.rules || defaultRules
      return [].concat(rules)
    },
    inputType () {
      let type = this.attrs.type || 'text' // 'tel', 'number', 'text', 'IDCard'
      if (this.attrs.type == 'IDCard' && !this.attrs.formatter) {
        type = 'text'
      }
      return type
    },
    inputPattern () {
      return this.attrs.type == 'number' ? 'number' : ''
    }
  },
  mounted () {
    this.form && this.form.fields.push(this)
    this.initialValue = this.value
  },
  methods: {
    getFilterRules (trigger) {
      return this.fieldRules.filter(rule => !rule.trigger || rule.trigger.indexOf(trigger) != -1)
    },
    validate (trigger, callback = function () { }) {
      let rules = this.getFilterRules(trigger)

      this.validateState = 'validating'
      this.validateDisabled = false

      let hasMaskCode = this.initialValue.indexOf('*') > -1 // 掩码
      if (this.attrs.readonly || hasMaskCode && this.initialValue == this.value) {
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
    onFieldBlur (e) {
      let inputValue = e.target.value
      this.$emit('on-blur', e)
      if (this.attrs.readonly) return

      if (this.attrs.type == 'number') {
        if (this.attrs.fixed > 1 && inputValue != '') {
          // 保留n位小数，如：2，会在2后面补上00.即2.00
          let dotPos = inputValue.indexOf('.')
          if (dotPos < 0) {
            inputValue += '.'
            dotPos = inputValue.length - 1
          }
          while (inputValue.length <= dotPos + this.attrs.fixed) {
            inputValue += '0'
          }
        } else {
          // 不能以'.'结尾
          if (/\.$/.test(inputValue)) {
            inputValue = inputValue.replace('.', '')
          }
        }
      }
      this.$emit('input', inputValue)
      e.target.value = inputValue

      this.blurTimer = setTimeout(() => {
        this.focused = false
        this.validate('blur')
        if (inputValue == '') { e.target.value = '' }
      }, 200)
    },
    onFieldChange (e) {
      if (this.validateDisabled) {
        this.validateDisabled = false
        return
      }
      this.validate('change')
      this.$emit('on-change', e)
    },
    onFieldInput (e) {
      let inputValue = e.target.value
      this.validateState = ''
      // 修复input 属性为 number，maxlength不起作用
      if (this.attrs.type == 'number' && this.attrs.maxlength && inputValue.length > this.attrs.maxlength) {
        inputValue = inputValue.slice(0, this.attrs.maxlength)
      }
      if (this.attrs.type == 'number') {
        inputValue = clearNonNumbers(inputValue)

        // 限制小数位数
        let dotPos = inputValue.indexOf('.')
        if (this.attrs.fixed > 0 && dotPos > -1) {
          inputValue = inputValue.substring(0, dotPos + this.attrs.fixed + 1)
        } else if (this.attrs.fixed <= 0 && dotPos > -1) {
          inputValue = inputValue.substring(0, dotPos)
        }
        // 解决ios输入非数字时value清空问题
        if (inputValue == '' && this.prevValue != inputValue && !this.isBackSpace) {
          inputValue = this.prevValue
        }
      } else if (this.attrs.type == 'tel') {
        inputValue = telephoneClearNonNumbers(inputValue)
      } else if (this.attrs.type == 'IDCard') {
        inputValue = IDCardClearNonNumbers(inputValue)
      }
      if (this.attrs.type != 'text') {
        e.target.value = inputValue
      }
      this.$emit('input', inputValue)
      this.prevValue = inputValue
      this.$emit('on-input', e)
    },
    onFieldFocus (e) {
      if (this.attrs.readonly) return
      this.focused = true
      this.$emit('on-focus', e)
      // e.target.scrollIntoView()
      this.validateState = ''
    },
    onFieldKeyup (e) {
      if (this.attrs.type == 'number' && !this.isAndroid && this.value == '' && this.prevValue == '' && e.keyCode != 189) e.target.value = ''
      this.isBackSpace = false
      this.$emit('on-keyup', e)
    },
    onFieldKeydown (e) {
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
      this.$emit('input', '')
      this.$emit('on-clear', e)
      this.prevValue = ''
      this.focus()
    },
    // 手动聚焦输入框
    focus () {
      this.$refs.input.focus()
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
@inputCls: r--input;

.@{inputCls} {
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
  &-mode-to-top&:not(&-empty) &-inner,
  &-mode-to-top&-error-at-placeholder&-error &-inner {
    padding-top: 20px;
  }
  &-mode-to-top&&-focused &-label,
  &-mode-to-top&:not(&-empty) &-label,
  &-mode-to-top&-error-at-placeholder&-error &-label {
    position: absolute;
    top: 5px;
    font-size: 12px;
    color: #bdbdbd;
  }
  &-mode-to-top &-label {
    font-size: 16px;
    color: #bdbdbd;
    position: absolute;
  }
  &-mode-to-top &-input {
    font-size: 16px;
    line-height: 21px;
    color: #757575;
  }
  &-mode-default &-label {
    font-size: 14px;
    color: #333;
  }
  &-mode-default &-input {
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
  &-input {
    outline: none;
    appearance: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    border: none;
    box-sizing: border-box;
    flex: 1;
    width: 100%;
    background-color: transparent;
    z-index: 2;
    &[readonly],
    &[disabled] {
      color: #999;
    }
    &::placeholder {
      color: #c5c8ce;
    }
  }
  &-text-right &-input {
    text-align: right;
  }
  &-text-right&-show-clear &-input {
    padding-right: 20px;
  }
  &-text-center &-input {
    text-align: center;
  }
  &-unit {
    font-size: 14px;
    line-height: 1;
    color: #333;
    padding-left: 5px;
    white-space: nowrap;
  }
  &-clear {
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    line-height: 1;
    text-align: center;
    box-sizing: border-box;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    display: flex;
    align-items: center;
    z-index: 2;
  }
  &-clear svg {
    width: 30x;
    height: 30x;
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
  }
  &-error-at-placeholder&-error input,
  &-error-at-placeholder&-error input::placeholder {
    color: transparent;
  }
  &-hidden {
    display: none;
  }
}
</style>
