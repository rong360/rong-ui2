<template>
  <div class="form-example-css">
    <r-titlebar theme="b"
              @on-back="onBack">FormCss效果</r-titlebar>
    <r-form :select-arrow-style="{color: '#C8C7CC'}"
          :input-clear-style="{color: '#C8C7CC'}"
          @on-iscompleted="setIsCompleted"
          text-position="left"
          placeholder=""
          mode="to-top"
          ref="form">
      <r-input :title="user.title"
             :name="user.name"
             :maxlength="user.maxlength"
             :rules="user.rules"
             v-model="user.value"></r-input>
      <r-input v-bind="age"
             v-model="age.value"></r-input>
      <r-input v-bind="amount"
             v-model="amount.value"
             @on-input="handleInputAmount"></r-input>
      <r-input v-bind="phone"
             v-model="phone.value"></r-input>
      <r-input v-bind="email"
             v-model="email.value"></r-input>
      <r-input v-bind="IDCard"
             v-model="IDCard.value"></r-input>
      <r-select v-bind="loanTerm"
              v-model="loanTerm.value"></r-select>
      <r-selectdate :title="birthday.title"
                  :name="birthday.name"
                  v-model="birthday.value"></r-selectdate>

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
    </r-form>
    <div class="result">
      <p v-for="(field, index) in fields" :key="index">{{field.conf ? `${field.conf.title}: ${field.conf.value}` : ''}}</p>
    </div>
  </div>
</template>

<script>
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
        "value": "",
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
        "maxlength": 8,
        "prepend": "RP"
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
      loanTerm: {
        title: "贷款期限",
        name: "loan_term",
        value: '',
        placeholder: "",
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
            onInput: (e, component) => {
              let value = e.target.value
              if (value > 12) {
                component.setCurrentValue(12)
                component.validateState = 'error'
                component.validateMessage = '贷款期限最长12个月，以为您变更为12个月'
              }
            },
            rules: [{
              validator (rule, value, callback, source, options) {
                let { component } = options
                if (value === '') {
                  return new Error(component.title + '不能为空')
                } else if (value > 12) {
                  // component.setCurrentValue(12, {validateDisabled: true})
                  // return new Error('贷款期限最长12个月，以为您变更为12个月')
                }
                callback()
              },
              trigger: 'blur'
            }]
          }]
        }],
        rules: [{
          validator (rule, value, callback) {
            if (value == 1) {
              return new Error('目前暂不支持1个月的贷款，请选择贷款期限')
            } else if (value == '') {
              return new Error('贷款期限不能为空')
            }
            callback()
          },
          trigger: 'blur'
        }]
      },
      birthday: {
        title: '妹妹出生日期',
        name: 'birthday',
        value: '',
        valueFormat: 'yyyy/mm/dd',
        textFormat: 'yyyy年mm月dd日'
      },
      fields: [],
      isCompleted: false
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
    handleInputAmount (e, component) {
      let value = e.target.value
      if (value > 10000) {
        component.setCurrentValue(10000)
        component.validateState = 'error'
        component.validateMessage = '最大申请金额为10000元，已为你自动变更为10000元'
      }
    },
    doSubmit () {
      this.$refs.form.validate((valid, validateMessage) => {
        if (valid) {
          this.$dialog({
            propsData: {
              message: this.$refs.form.getValue().map(field => `<p class="ta-l fs-14"><span class="fw-b">${field.title}:</span>${field.value}</p>`).join('')
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
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
          this.$dialog({
            propsData: {
              message: this.$refs.form.getValue().map(field => `<p class="ta-l fs-14"><span class="fw-b">${field.title}:</span>${field.value}</p>`).join('')
            },
            methods: {
              onConfirm () {
                this.remove()
              }
            }
          })
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
.form-example-css {
  .result {
    font-size: 14px;
    color: #333333;
    padding: 10px;
    background-color: lightgray;
  }
}
</style>
