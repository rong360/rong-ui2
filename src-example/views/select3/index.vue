<template>
  <div class="select-example">
    <Titlebar theme="b"
              @on-back="onBack">Select3</Titlebar>
    <div class="tips">标题和选项在同一行展示， 用于性别选择等</div>
    <div class="list">
      请选择以下信息：
      <Form ref="form"
            text-position="right">
        <Select3 :attrs="config"
                 v-model="config.value"
                 ref="select1"></Select3>
        <Select3 :attrs="config2"
                 v-model="config2.value"
                 ref="select2"></Select3>
        <div class="btn-wrap">
          <Button @on-click="getValue1">获取公积金数据</Button>
          <Button @on-click="getValue2">获取社保数据</Button>
        </div>

        <div class="btn-wrap">
          <Button @on-click="getValue4">借助Form组件获取所有数据</Button>
        </div>
        <div class="btn-wrap">
          <Button @on-click="resetFields">重置</Button>
        </div>
        <ViewSource :code="sourceCode" />
      </Form>
    </div>
  </div>

</template>
<script>
import sourceCode from './code.txt'

export default {
  name: "SelectExp",
  data () {
    return {
      config: {
        "rely_policy_id": 0,
        "id": "635",
        "category_id": "1",
        "title": "本地公积金",
        "var_name": "user_social_security",
        "type": "2",
        "verify_type": "0",
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
      config2: {
        "rely_policy_id": 1,
        "id": "636",
        "category_id": "1",
        "title": "本地社保",
        "var_name": "shebao",
        "type": "2",
        "verify_type": "0",
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
      sourceCode
    }
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
