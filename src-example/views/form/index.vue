<template>
  <div class="form-example">
    <Titlebar theme="b"
              @on-back="onBack">Form</Titlebar>
    <Form :select-arrow-style="{color: '#C8C7CC'}"
          :input-clear-style="{color: '#C8C7CC'}"
          select-cancel-btn-text="cancel"
          select-confirm-btn-text="confirm"
          @on-iscompleted="setIsCompleted"
          text-position="right"
          placeholder="请输入"
          ref="form">
      <Input :attrs="user"
             v-model="user.value"></Input>
      <Input :attrs="age"
             v-model="age.value"></Input>
      <Input :attrs="amount"
             v-model="amount.value"></Input>
      <Input :attrs="phone"
             v-model="phone.value"></Input>
      <Input :attrs="email"
             v-model="email.value"></Input>
      <Input :attrs="IDCard"
             v-model="IDCard.value"></Input>
      <Select :attrs="loanTerm"
              v-model="loanTerm.value"></Select>
      <SelectDate :attrs="birthday"
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
      <p v-for="field in fields"><span>{{field.$options.propsData.attrs.title}}：</span>{{field.$options.propsData.attrs.value}}</p>
    </div>
    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'

export default {
  data () {
    let self = this

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
        placeholder: "请选择贷款期限",
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
              validator (rule, value, callback) {
                let component = self.fields.find(component => component.$options.propsData.attrs.name == 'm_term')
                if (value > 12) {
                  component.$emit('input', 12)
                  return new Error('贷款期限最长12个月，以为您变更为12个月')
                } else if (value < 3) {
                  component.$emit('input', 3)
                  return new Error('贷款期限最短3个月，以为您变更为3个月')
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
              // this.$toast('目前暂不支持1个月的贷款，请选择贷款期限');
              return new Error('目前暂不支持1个月的贷款，请选择贷款期限')
            }
            callback()
          }
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
  .result {
    font-size: 14px;
    color: #333333;
    padding: 10px;
    background-color: lightgray;
  }
}
</style>
