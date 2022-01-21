<template>
  <div :class="wrapCls">
    <div :class="innerCls">
      <label :class="labelCls"
             :style="labelStyle">{{attrs.title}}</label>
      <div :class="prependCls"
           v-if="$slots.prepend">
        <slot name="prepend"></slot>
      </div>
      <div :class="prependCls"
           v-if="attrs.prepend"
           v-html="attrs.prepend"></div>
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
        <div v-if="showEditIcon"
             class="input-edit"
             :class="inputCls"><span class="placeholder">{{value}}</span><span class="edit-icon"></span></div>
        <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && isErrorAtPlaceholder"
             :class="errorCls2">{{validateMessage}}</div>
        <a v-show="showClear"
           :class="clearCls"
           @click.prevent.stop="onClear"
           ref="clear"><svg width="14px"
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
          </svg></a>
      </div>
      <div v-if="attrs.unit"
           :class="unitCls">{{attrs.unit}}</div>
      <div :class="appendCls"
           v-if="$slots.append">
        <slot name="append"></slot>
      </div>
      <div :class="appendCls"
           v-if="attrs.append"
           v-html="attrs.append"></div>
      <div v-if="validateState=='error' && (this.form?this.showMessage&&this.form.showMessage:this.showMessage) && !isErrorAtPlaceholder && !this.showEmailPan"
           :class="errorCls">{{validateMessage}}</div>
    </div>
    <div v-if="showEmailPanel"
         :class="emailPanel">
      <div v-for="emailSuffix in filteredEmailList"
           @click="setEmail"
           :class="emailPanelItem"
           v-html="(value.split('@')[0] + '@' + emailSuffix).replace(value, function(text){ return `<font>${text}</font>` })"></div>
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
    errorAtPlaceholder: Boolean,
    // v1.1.2
    required: Boolean,
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
      prevValue: this.value || '',
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
      let labelPosition = this.labelPosition || this.attrs.labelPosition || this.form && this.form.labelPosition || 'left'
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
          [`${prefixCls}-error`]: this.validateState == 'error' && !this.showEmailPan,
          [`${prefixCls}-show-clear`]: this.showClear,
          [`${prefixCls}-hidden`]: this.attrs.type == 'hidden',
          [`${prefixCls}-email`]: this.attrs.type == 'email',
          [`${prefixCls}-error-at-placeholder`]: this.isErrorAtPlaceholder,
          [`${prefixCls}-required`]: this.isRequired,
          [`${prefixCls}-readonly`]: !!this.attrs.readonly,
          [`${prefixCls}-placeholder`]: this.value == '',
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
      if (this.labelWidth || this.labelWidth == 0) {
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
      return this.attrs.placeholder || this.placeholder || (this.form && this.form.placeholder) || ''
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
      } else if (this.attrs.type == 'email') {
        defaultRules.push({ type: "email", message: "邮箱格式不正确", trigger: "blur" })
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
    },
    emailPanel () {
      return `${prefixCls}-email-panel`
    },
    emailPanelItem () {
      return `${prefixCls}-email-panel--item`
    },
    filteredEmailList () {
      let emailList = this.attrs.emailList || [],
        emailSuffix = this.value.split('@')[1],
        arr = []
      if (!emailSuffix && this.value.length) {
        return emailList
      }
      for (var i = 0; i < emailList.length; i++) {
        let email = emailList[i].replace('@', '')
        if (email.indexOf(emailSuffix) > -1) {
          arr.push(email)
        }
      }
      return arr
    },
    showEmailPanel () {
      let currEmailSuffix = String(this.value).split("@")[1]
      return this.attrs.type == 'email' &&
        this.showEmailPan &&
        (this.filteredEmailList.length > 1 ||
          (this.filteredEmailList.length == 1 && this.filteredEmailList[0] != currEmailSuffix))
    },
    showEditIcon () {
      return this.showEdit && !this.focused && this.value != ''
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

      if (!this.isRequired) {
        this.validateState = ''
        callback()
        return true
      }

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
    onClickInputMask () {
      if (this.attrs.readonly) return
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
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
        if (this.attrs.type == 'email') this.showEmailPan = false
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
      this.validateMessage = ''
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
      if (e.target.value == '' || e.target.value != inputValue) {
        e.target.value = inputValue
      }
      this.$emit('input', inputValue)
      this.prevValue = inputValue
      this.$emit('on-input', e)
    },
    onFieldFocus (e) {
      if (this.attrs.readonly) return
      this.focused = true
      if (this.attrs.type == 'email') this.showEmailPan = true
      this.$emit('on-focus', e)
      // e.target.scrollIntoView()
    },
    onFieldKeyup (e) {
      if (this.attrs.type == 'number' && !this.isAndroid && this.value == '' && this.prevValue == '' && e.keyCode != 189) e.target.value = ''
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
      this.$emit('input', '')
      this.$emit('on-clear', e)
      this.prevValue = ''
      this.focus()
    },
    setEmail (e) {
      this.$emit('input', e.target.innerText)
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
  &-mode-to-top&:not(&-focused) &-input::-webkit-input-placeholder {
    color: transparent;
  }
  &-mode-to-top &-prepend {
    display: none;
  }
  &-mode-to-top&&-focused &-prepend,
  &-mode-to-top&:not(&-empty) &-prepend {
    display: block;
  }
  &-mode-to-top &-label {
    font-size: 16px;
    color: #bdbdbd;
    position: absolute;
  }
  &-mode-to-top &-input {
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
  &-mode-default &-input {
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  &-show-edit &-input {
    font-size: 35px;
    line-height: 40px;
    font-weight: 600;
  }
  &-show-edit &-error-tip {
    padding-top: 5px;
    line-height: 17px;
  }
  &-show-edit &-inner {
    padding-top: 0px;
    padding-bottom: 0px;
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
    margin-right: 10px;
    transition: all 0.3s ease-out;
  }
  &-prepend,
  &-append {
    font-size: 16px;
    color: #acb4c0;
    position: relative;
  }
  &-prepend {
    padding-right: 5px;
  }
  &-append {
    padding-left: 5px;
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
    min-height: 20px;
    word-break: break-all;
    letter-spacing: 0;
    font-family: "PingFangSC-Regular PingFang SC", arial, sans-serif;
    z-index: 2;
    &[readonly],
    &[disabled] {
      color: #999;
    }
    &::placeholder {
      color: #c5c8ce;
    }
  }
  .input-edit {
    position: absolute;
    top: 0;
    left: 0;
    width: auto !important;
    z-index: 1;
    display: flex;
    align-items: center;
    .placeholder {
      letter-spacing: 0;
      opacity: 0;
      font-family: "PingFangSC-Regular PingFang SC", arial, sans-serif;
    }
    .edit-icon {
      width: 15px;
      height: 15px;
      background-image: url(data:image/png;base64,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);
      background-repeat: no-repeat;
      background-size: contain;
      margin-left: 7px;
      position: relative;
      top: -5px;
    }
  }
  &-placeholder &-input {
    color: #c8c7cc;
    font-weight: normal;
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
  &-show-clear &-input {
    padding-right: 20px;
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
    border-color: #fa5050;
  }
  &-error&-mode-default &-inner {
    margin-bottom: 20px;
  }
  &-error-tip {
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    line-height: 17px;
    padding-top: 4px;
    font-size: 12px;
    color: #fa5050;
    z-index: 1;
  }
  &-error-tip2 {
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    line-height: 1px;
    font-size: 12px;
    color: #fa5050;
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
  &-email-panel {
    padding: 5px 15px;
  }
  &-email-panel--item {
    line-height: 30px;
    font-size: 14px;
    color: #333;
    font {
      color: #4084e8;
    }
  }
}
</style>
