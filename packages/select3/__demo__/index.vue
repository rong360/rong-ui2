<template>
  <div class="select-example">
    <r-titlebar theme="b"
              @on-back="onBack">Select3</r-titlebar>
    <div class="tips">标题和选项在同一行展示， 用于性别选择等</div>
    <div class="list">
      请选择以下信息：
      <r-form ref="form"
            text-position="right">
        <r-select3 :title="config.title"
                 :name="config.name"
                 :data="config.data"
                 v-model="config.value"
                 ref="select1"></r-select3>
        <r-select3 v-bind="config2"
                 v-model="config2.value"
                 ref="select2"></r-select3>
        <div class="btn-wrap">
          <r-button @on-click="getValue1">获取公积金数据</r-button>
          <r-button @on-click="getValue2">获取社保数据</r-button>
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
      config: {
        "rely_policy_id": 0,
        "id": "635",
        "category_id": "1",
        "title": "本地公积金",
        "name": "user_social_security",
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
        "name": "shebao",
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
      }
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
