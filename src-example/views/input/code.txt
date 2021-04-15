<template>
  <div class="input-example">
    <Titlebar theme="b"
              @on-back="onBack">Input</Titlebar>

    <div class="title">文本 type="text" -- {{user.value}}</div>
    <Input :attrs="user"
           v-model="user.value"></Input>

    <div class="title">数字(整型) type="number" -- {{age.value}}</div>
    <Input :attrs="age"
           v-model="age.value"></Input>

    <div class="title">数字(浮点) type="number" -- {{amount.value}}</div>
    <Input :attrs="amount"
           v-model="amount.value"></Input>

    <div class="title">电话 type="tel" -- {{phone.value}}</div>
    <Input :attrs="phone"
           v-model="phone.value"><span slot="prepend"
          style="font-size: 0.74667rem; padding-right: .2rem">+91</span></Input>
    <Input :attrs="OTP"
           v-model="OTP.value"><span slot="append"
          style="display: inline-block; border: 1px solid #bebebe; font-size: 0.74667rem; padding: .1rem .3rem; border-radius: 1rem">Get OTP code</span></Input>

    <div class="title">邮箱 type="email" -- {{email.value}}</div>
    <Input :attrs="email"
           v-model="email.value"></Input>

    <div class="title">国内身份证 type="IDCard" -- {{IDCard.value}}</div>
    <Input :attrs="IDCard"
           v-model="IDCard.value"></Input>

    <div style="background: lightgray">
      <p></p>
      <Input :attrs="user"
             label-position='right'
             label-width='150px'
             text-position="right"
             v-model="user.value"></Input>
      <Input :attrs="age"
             label-position='right'
             label-width='150px'
             v-model="age.value"></Input>
      <Input :attrs="amount"
             label-position='right'
             label-width='150px'
             v-model="amount.value"></Input>
      <Input :attrs="phone"
             label-position='right'
             label-width='150px'
             v-model="phone.value"></Input>
      <Input :attrs="email"
             label-position='right'
             label-width='150px'
             v-model="email.value"></Input>
      <Input :attrs="IDCard"
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
        "data": "",
        "unit": "",
        "material_type": "100",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0,
        "maxlength": "6",
        "rules": [{
          "required": true,
          "message": "姓名不能为空",
          "trigger": "blur"
        }, {
          validator (rule, value, callback) {
            if (value.length < 3) {
              return new Error('姓名最少三个字')
            }
            callback()
          },
          trigger: 'blur'
        }]
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
        "value": "10000.00",
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
        "maxlength": 11
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
  methods: {
    onBack () {
      this.$router.push('/')
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
