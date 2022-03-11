<template>
  <div class="input-example">
    <Titlebar theme="b"
              @on-back="onBack">Input</Titlebar>

    <div class="title">文本 type="text" -- {{user.value}}</div>
    <Input :title="user.title"
           :name="user.name"
           :type="user.type"
           :rules="user.rules"
           :showEdit="false"
           maxlength="6"
           v-model="user.value"></Input>

    <div class="title">数字(整型) type="number" -- {{age.value}}</div>
    <Input v-bind="age"
           v-model="age.value"></Input>

    <div class="title">数字(浮点) type="number" -- {{amount.value}}</div>
    <Input v-bind="amount" v-model="amount.value" @on-input="handleInputAmount"></Input>

    <div class="title">电话 type="tel" -- {{phone.value}}</div>
    <Input v-bind="phone"
           v-model="phone.value"></Input>
    <Input v-bind="OTP"
           v-model="OTP.value"><span slot="append"
          style="display: inline-block; border: 1px solid #bebebe; font-size: 0.74667rem; padding: .1rem .3rem; border-radius: 1rem">Get OTP code</span></Input>

    <div class="title">邮箱 type="email" -- {{email.value}}</div>
    <Input v-bind="email"
           v-model="email.value"></Input>

    <div class="title">国内身份证 type="IDCard" -- {{IDCard.value}}</div>
    <Input v-bind="IDCard"
           v-model="IDCard.value"></Input>

    <div style="background: lightgray">
      <p></p>
      <Input v-bind="user"
             label-position='right'
             label-width='150px'
             text-position="right"
             v-model="user.value"></Input>
      <Input v-bind="age"
             label-position='right'
             label-width='150px'
             v-model="age.value"></Input>
      <Input v-bind="amount"
             label-position='right'
             label-width='150px'
             v-model="amount.value"></Input>
      <Input v-bind="phone"
             label-position='right'
             label-width='150px'
             v-model="phone.value"></Input>
      <Input v-bind="email"
             label-position='right'
             label-width='150px'
             v-model="email.value"></Input>
      <Input v-bind="IDCard"
             label-position='right'
             label-width='150px'
             v-model="IDCard.value"></Input>
    </div>
    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'

export default {
  data () {
    return {
      user: {
        "rely_policy_id": 0,
        "id": "277",
        "category_id": "1",
        "title": "本人姓名",
        "placeholder": "",
        "var_name": "bureau_user_name",
        "type": "text",
        "verify_type": "text",
        "material_type": "100",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0,
        "disabled": false,
        "maxlength": 6,
        "autofocus": false
      },
      age: {
        "rely_policy_id": 0,
        "id": "6922",
        "category_id": "1",
        "title": "年龄",
        "var_name": "age",
        "type": "number",
        "verify_type": "0",
        "data": "",
        "unit": "",
        "material_type": "107",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "fixed": 0,
        "readonly": 0,
        "maxlength": 3
      },
      amount: {
        "rely_policy_id": 0,
        "id": "692",
        "category_id": "1",
        "title": "申请金额",
        "var_name": "application_amount",
        "type": "number",
        "verify_type": "0",
        "data": "",
        "unit": "",
        "material_type": "107",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "1000",
        "fixed": 2,
        "readonly": 0,
        "maxlength": 8,
        "prepend": "RP"
      },
      phone: {
        "rely_policy_id": 0,
        "id": "6929",
        "category_id": "1",
        "title": "手机号码",
        "var_name": "phone_number",
        "type": "tel",
        "verify_type": "0",
        "data": "",
        "unit": "",
        "material_type": "107",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0,
        "maxlength": 11,
        "prepend": (h) => {
          return h('span', {
            style: { color: 'red' }
          }, '+91')
        }
      },
      OTP: {
        "rely_policy_id": 0,
        "id": "277",
        "category_id": "1",
        "title": "验证码",
        "placeholder": "",
        "var_name": "otp_code",
        "type": "text",
        "verify_type": "text",
        "data": "",
        "unit": "",
        "material_type": "100",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0,
        "maxlength": 6
      },
      email: {
        "rely_policy_id": 0,
        "id": "692999",
        "category_id": "1",
        "title": "邮箱",
        "var_name": "email",
        "type": "email",
        "verify_type": "0",
        "data": "",
        "unit": "",
        "material_type": "107",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0,
        "emailList": [
          "qq.com",
          "sina.com",
          "sohu.com",
          "163.com",
          "foxmail.com",
          "gmail.com",
          "rong360.com",
          "edu.cn",
          "outlook.com",
          "vip.qq.com",
          "126.com"
        ],
        "rules": [{
          "required": true,
          "message": "邮箱不能为空",
          "trigger": "blur"
        },
        {
          "type": "email",
          "message": "邮箱格式不正确",
          "trigger": "blur"
        }]
      },
      IDCard: {
        "rely_policy_id": 0,
        "id": "372",
        "category_id": "1",
        "title": "本人身份证号码",
        "var_name": "user_id",
        "type": "IDCard",
        "verify_type": "IDCard",
        "data": "",
        "unit": "",
        "material_type": "100",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0
      },
      sourceCode
    }
  },
  mounted () {
    setTimeout(() => {
      this.user.title = "本人姓名2"
    }, 1000);
  },
  methods: {
    onBack () {
      this.$router.push('/')
    },
    handleInputAmount (e, component) {
      let value = e.target.value
      if (value > 10000) {
        component.setCurrentValue(10000)
        component.validateState = 'error'
        component.validateMessage = '最大申请金额为10000元，已为你自动变更为10000元'
      }
    }
  }
}
</script>

<style lang="less">
.input-example {
  .title {
    font-size: 14px;
    margin-top: 30px;
    line-height: 30px;
    background-color: lightsteelblue;
  }
}
</style>
