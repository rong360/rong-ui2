<template>
  <div class="select-example">
    <r-titlebar theme="b"
              @on-back="onBack">Select2</r-titlebar>
    <div class="tips">下拉列表数据小于6条时固定展示，超过6条出滚动条</div>
    <div class="list">
      请选择以下信息：
      <r-form ref="form"
            text-position="right">
        <r-select2 :title="config.title"
                 :name="config.name"
                 :data="config.data"
                 v-model="config.value"
                 picker-title="标题"
                 ref="select1"></r-select2>
        <r-select2 v-bind="config2"
                 v-model="config2.value"
                 cancel-btn-text="cancel"
                 confirm-btn-text="confirm"
                 ref="select2"></r-select2>
        <r-select2 v-bind="config3"
                 v-model="config3.value"
                 ref="select3"></r-select2>
        <button class="fs-14" @click="doChangeData">点击改变人群类别data</button>
        <div class="btn-wrap">
          <r-button @on-click="getValue1">获取人群类别数据</r-button>
          <r-button @on-click="getValue2">获取贷款期限数据</r-button>
          <r-button @on-click="getValue3">获取教育程度数据</r-button>
        </div>

        <div class="btn-wrap">
          <r-button @on-click="getValue4">借助Form组件获取所有数据</r-button>
        </div>
        <div class="btn-wrap">
          <r-button @on-click="resetFields">重置</r-button>
        </div>
      </r-form>
    </div>
  </div>

</template>
<script>
export default {
  name: "SelectExp",
  data () {
    return {
      config: {},
      config0: {
        title: "人群类别-before",
        name: "population_category0",
        value: '',
        cancelBtnText: 'cancel',
        confirmBtnText: 'confirm',
        pickerTitle: '标题',
        data: [
          {
            text: '企业主',
            value: 'office_lady',
            children: [
              {
                componentType: 'Input',
                type: "number",
                title: "每月收入流水",
                unit: "万元",
                name: "waterflow",
                value: "",
                placeholder: "请输入每月收入流水"
              }
            ]
          },
          {
            text: '医生',
            value: 'doctor',
            children: [
              {
                type: "Select",
                title: "职位",
                name: "free_type",
                value: 2,
                data: [
                  {
                    text: "院长",
                    value: 0
                  },
                  {
                    text: "主任医师",
                    value: 1
                  },
                  {
                    text: "副主任医师",
                    value: 2
                  },
                  {
                    text: "住院医",
                    value: 3
                  },
                  {
                    text: "医学生",
                    value: 4
                  }
                ]
              }
            ]
          }
        ]
      },
      config1: {
        title: "人群类别-after",
        name: "population_category1",
        value: '',
        data: [
          {
            text: '上班族',
            value: 'office_lady',
            children: [
              {
                componentType: 'Input',
                type: "text",
                title: "姓名(无需校验)",
                name: "username",
                value: '',
                placeholder: "请输入用户姓名",
                rules: []
              },
              {
                componentType: 'Input',
                type: "IDCard",
                title: "身份证号码",
                name: "idcard",
                value: '',
                placeholder: "请输入身份证号码"
              },
              {
                componentType: 'Input',
                type: "tel",
                title: "手机号码",
                name: "mobile",
                value: '',
                placeholder: "请输入您的手机号码",
                maxlength: 11
              }
            ]
          },
          {
            text: '学生',
            value: 'student',
            children: [
              {
                componentType: 'Input',
                type: "number",
                title: "每月花费",
                name: "expense",
                value: '',
                unit: "元",
                placeholder: "请输入您每月生活费"
              },
              {
                type: "Select",
                title: "爱好",
                name: "interest",
                value: 'maishu',
                data: [
                  {
                    text: "买书",
                    value: 'maishu',
                    children: [
                      {
                        type: "Select",
                        title: "书籍类型",
                        name: "book_type",
                        value: 'xiaoshuo',
                        data: [
                          {
                            text: '外语',
                            value: 'waiyu'
                          },
                          {
                            text: '汉语',
                            value: 'hanyu'
                          },
                          {
                            text: '小说',
                            value: 'xiaoshuo'
                          }
                        ]
                      },
                      {
                        componentType: 'Input',
                        type: "number",
                        title: "买书花费",
                        name: "buy_book_expense",
                        value: '',
                        unit: "元",
                        placeholder: "请输入您每月买书费用"
                      }
                    ]
                  },
                  {
                    text: "娱乐",
                    value: '娱乐'
                  }
                ]
              }
            ]
          },
          {
            text: '自由职业者',
            value: 'free',
            children: [
              {
                type: "Select",
                title: "自由职业者类型",
                name: "free_type",
                value: 1,
                data: [
                  {
                    text: "微商",
                    value: 0
                  },
                  {
                    text: "网络小说写手",
                    value: 1
                  }
                ]
              }
            ]
          }
        ]
      },
      config2: {
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
          text: "3个月",
          value: '3'

        },
        {
          text: "4个月",
          value: '4'

        },
        {
          text: "5个月",
          value: '5'

        },
        {
          text: "6个月",
          value: '6'

        },
        {
          text: "7个月",
          value: '7'

        },
        {
          text: "8个月",
          value: '8'

        },
        {
          text: "9个月",
          value: '9'

        },
        {
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
          validator (rule, value, callback, source, options) {
            if (value == 1) {
              return new Error('目前暂不支持1个月的贷款，请选择贷款期限')
            }
            callback()
          },
          trigger: 'blur'
        }]
      },
      config3: {
        title: "教育程度",
        name: "education",
        value: '2',
        lr: "right",
        placeholder: "请选择贷款期限",
        readonly: true,
        data: [{
          text: "硕士及以上",
          value: "1"
        }, {
          text: "本科",
          value: '2'

        }, {
          text: "大专",
          value: "3"
        }, {
          text: "中专/高中及以下",
          value: "4"
        }]
      }
    }
  },
  created () {
    this.config = this.config0;
  },
  methods: {
    doChangeData () {
      if (this.config.name == "population_category0") {
        this.config = this.config1;
      } else {
        this.config = this.config0;
      }
    },
    getValue1 () {
      let obj = this.$refs.select1.getValue()
      this.$dialog({
        propsData: {
          message: `<div style="word-break: break-all">${JSON.stringify(obj)}</div>`,
          showCancelBtn: false
        },
        methods: {
          onConfirm () {
            this.remove()
          }
        }
      })
    },
    getValue2 () {
      let obj = this.$refs.select2.getValue()
      this.$dialog({
        propsData: {
          message: `<div style="word-break: break-all">${JSON.stringify(obj)}</div>`,
          showCancelBtn: false
        },
        methods: {
          onConfirm () {
            this.remove()
          }
        }
      })
    },
    getValue3 () {
      let obj = this.$refs.select3.getValue()
      this.$dialog({
        propsData: {
          message: `<div style="word-break: break-all">${JSON.stringify(obj)}</div>`,
          showCancelBtn: false
        },
        methods: {
          onConfirm () {
            this.remove()
          }
        }
      })
    },
    getValue4 () {
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
              message: validateMessage.map(item => item.replace('不能为空', '')).join('、') + '不能为空'
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
    resetFields () {
      this.$refs.form.resetFields()
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
.select-example {
  .tips {
    background-color: lightgoldenrodyellow;
    padding: 15px;
    font-size: 12px;
  }
  .list {
    padding: 15px 0 15px 15px;
  }
  .btn-wrap {
    display: flex;
    font-size: 12px;
    padding-right: 15px;
    margin-top: 30px;
    > div {
      flex: 1;
    }
    :nth-child(2) {
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
</style>
