<template>
  <div class="form-example">
    <Titlebar theme="b"
              @on-back="onBack">Form</Titlebar>
    <Form :select-arrow-style="{color: '#666', width: '0.32rem'}"
          :input-clear-style="{color: '#C8C7CC'}"
          select-cancel-btn-text="cancel"
          select-confirm-btn-text="confirm"
          @on-iscompleted="setIsCompleted"
          text-position="left"
          label-position="left"
          label-width="4.48rem"
          placeholder="请输入"
          select-placeholder="请选择"
          ref="form">
      <Input :title="user.title"
             :name="user.name"
             v-model="user.value"></Input>
      <Input v-bind="age"
             v-model="age.value"></Input>
      <Input v-bind="amount"
             v-model="amount.value"></Input>
      <Input v-bind="phone"
             v-model="phone.value"></Input>
      <Input v-bind="email"
             v-model="email.value"></Input>
      <Input v-bind="IDCard"
             v-model="IDCard.value"></Input>
      <Select :title="loanTerm.title"
              :name="loanTerm.name"
              :data="loanTerm.data"
              v-model="loanTerm.value"></Select>
      <Select2 v-bind="contacts"
               v-model="contacts.value"></Select2>
      <Select2 v-bind="contacts2"
               v-model="contacts2.value"></Select2>
      <Select3 v-bind="shebao"
               v-model="shebao.value"
               ref="select1"></Select3>
      <SelectDate v-bind="birthday"
                  v-model="birthday.value"></SelectDate>
      <div class="btn-wrap">
        <div :class="['btn', isCompleted ? '' : 'disabled']"
             @click="doSubmit">
          <p>提交({{ isCompleted ? "填写完毕" : "未填完" }})</p>
          <p>validate</p>
        </div>
        <div :class="['btn', isCompleted ? '' : 'disabled']"
             @click="doSubmit2">
          <p>提交({{ isCompleted ? "填写完毕" : "未填完" }})</p>
          <p>validateOneByOne</p>
        </div>
        <div class="btn"
             @click="doReset">重设</div>
      </div>
    </Form>
    <div class="result">
      <p v-for="field in fields">{{field.conf ? `${field.conf.title}: ${field.conf.value}` : ''}}</p>
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
        "type": "text",
        "title": "本人姓名",
        "name": "bureau_user_name",
        "value": "zyx",
        "placeholder": "",
        "readonly": 0,
        "maxlength": 6,
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
        "type": "number",
        "title": "年龄",
        "name": "age",
        "value": "23",
        "placeholder": "",
        "fixed": 0,
        "unit": "",
        "readonly": 0,
        "maxlength": 3
      },
      amount: {
        "type": "number",
        "title": "申请金额",
        "name": "application_amount",
        "value": "10000.00",
        "fixed": 2,
        "placeholder": "",
        "unit": "",
        "readonly": 0,
        "maxlength": 8
      },
      phone: {
        "type": "tel",
        "title": "手机号码",
        "name": "phone_number",
        "value": "13122222222",
        "unit": "",
        "placeholder": "",
        "readonly": 0,
        "maxlength": 11
      },
      email: {
        "type": "email",
        "title": "邮箱",
        "name": "email",
        "value": "test@qq.com",
        "readonly": 0,
        "placeholder": "",
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
        "type": "IDCard",
        "title": "本人身份证号码",
        "name": "user_id",
        "value": "110101199003079614",
        "placeholder": "",
        "readonly": 0
      },
      shebao: {
        "rely_policy_id": 0,
        "id": "635",
        "category_id": "1",
        "title": "本地公积金",
        "var_name": "user_social_security",
        "type": "2",
        "verify_type": "0",
        "textPosition": 'right',
        "data": [{
          "value": "1",
          "text": "有",
          "rely": []
        }, {
          "value": "2",
          "text": "无",
          "rely": []
        }],
        "unit": "",
        "material_type": "101",
        "info_property": "1",
        "level": 1,
        "desc": "",
        "value": "",
        "readonly": 0
      },
      loanTerm: {
        title: "贷款期限",
        name: "loan_term",
        value: '',
        data: [{
          text: "1个月",
          value: "1"
        }, {
          text: "2个月",
          value: '2'

        }, {
          text: "36个月",
          value: "36"
        }, {
          text: "自己输入",
          value: "0",
          children: [{
            componentType: 'Input',
            type: "number",
            title: "输入您的贷款期限",
            name: "m_term",
            value: "",
            unit: "个月",
            placeholder: "请输入您期望的贷款期限",
            rules: [{
              validator (rule, value, callback, source, options) {
                let { component } = options
                if (value === '') {
                  return new Error(component.title + '不能为空')
                } else if (value > 12) {
                  component.setCurrentValue(12)
                  return new Error('贷款期限最长12个月，以为您变更为12个月')
                }
                callback()
              },
              trigger: 'blur'
            }]
          }]
        }],
        rules: [{
          required: true,
          message: '贷款期限不能为空'
        }, {
          validator (rule, value, callback) {
            if (value == 1) {
              return new Error('目前暂不支持1个月的贷款，请选择贷款期限')
            }
            callback()
          }
        }]
      },
      contacts: {
        title: "联系人",
        name: "contacts",
        value: '',
        data: [{
          text: "父母",
          value: "1"
        }, {
          text: "配偶",
          value: '2'

        }, {
          text: "子女",
          value: "3"
        }, {
          text: "兄弟姐妹",
          value: "4"
        }]
      },
      contacts2: {
        title: "联系人2",
        name: "contacts2",
        value: '',
        data: [{
          text: "父母",
          value: "1"
        }, {
          text: "配偶",
          value: '2'

        }, {
          text: "子女",
          value: "3"
        }, {
          text: "兄弟姐妹",
          value: "4"
        }, {
          text: "朋友",
          value: "5"
        }, {
          text: "同学",
          value: "6"
        }, {
          text: "老乡",
          value: "7"
        }, {
          text: "战友",
          value: "9"
        }, {
          text: "车友",
          value: "10"
        }]
      },
      birthday: {
        title: '现单位工作年限(年)',
        name: 'birthday',
        value: '',
        valueFormat: 'yyyy/mm/dd',
        textFormat: 'yyyy年mm月dd日'
      },
      fields: [],
      isCompleted: false,
      sourceCode
    }
  },
  // computed: {
  //   isCompleted () {
  //     return this.fields.every(field => {
  //       if (field.fieldRules.length) {
  //         return field.currentValue != ''
  //       } else {
  //         return true
  //       }
  //     })
  //   }
  // },
  mounted () {
    this.fields = this.$refs.form.fields
  },
  methods: {
    doSubmit () {
      this.$refs.form.validate((valid, validateMessage) => {
        if (valid) {
          console.log('getValue', this.$refs.form.getValue())
          console.log('getSerializeValue', this.$refs.form.getSerializeValue())
          console.log('getObjectValue', this.$refs.form.getObjectValue())
        } else {
          this.$dialog({
            propsData: {
              message: validateMessage.join('<br/>')
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
        }
      })
    },
    doSubmit2 () {
      this.$refs.form.validateOneByOne((valid, validateMessage) => {
        if (valid) {
          console.log('getValue', this.$refs.form.getValue())
          console.log('getSerializeValue', this.$refs.form.getSerializeValue())
          console.log('getObjectValue', this.$refs.form.getObjectValue())
        } else {
          this.$dialog({
            propsData: {
              message: validateMessage
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
        }
      })
    },
    setIsCompleted (value) {
      this.isCompleted = value
    },
    doReset () {
      this.$refs.form.resetFields()
    },
    onEnter (e) {
      console.log(e.target.value)
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.btn-wrap {
  display: flex;
  .btn {
    border: 1px solid #ccc;
    border-radius: 4px;
    flex: 1;
    margin: 10px;
    padding: 10px 0;
    text-align: center;
    background-color: darkcyan;
    color: #fff;
    font-size: 12px;
    &.disabled {
      background-color: gray;
    }
  }
}
.form-example {
  .r--form {
    padding: 0 15px;
  }
  .result {
    font-size: 14px;
    color: #333333;
    padding: 10px;
    background-color: lightgray;
  }
}
</style>
