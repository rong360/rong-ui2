<template>
  <div class="selectdate-example">
    <Titlebar theme="b"
              @on-back="onBack">SelectDate</Titlebar>

    <p class="fs-14 mt-20">1，默认</p>
    <r-selectdate :title="config.title"
                :name="config.name"
                :placeholder="config.placeholder"
                :valueFormat="config.valueFormat"
                :textFormat="config.textFormat"
                :startYear="config.startYear"
                :endYear="config.endYear"
                :yearsLength="config.yearsLength"
                :offsetYear="config.offsetYear"
                :disabled="config.disabled"
                :pickerTitle="config.pickerTitle"
                :pickerCancelBtnText="config.pickerCancelBtnText"
                :pickerConfirmBtnText="config.pickerConfirmBtnText"
                :textPosition="config.textPosition"
                :rules="config.rules"
                v-model="config.value"></r-selectdate>

    <p class="fs-14 mt-20">2，只显示年份</p>
    <SelectDate v-bind="config1"
                v-model="config1.value"></SelectDate>

    <p class="fs-14 mt-20">3，显示年、月</p>
    <SelectDate v-bind="config2"
                v-model="config2.value"></SelectDate>

    <p class="fs-14 mt-20">4，添加css效果</p>
    <SelectDate v-bind="config3"
                v-model="config3.value"></SelectDate>
    <div class="result">
      <p v-for="(field, index) in fields"
         :key="index">{{field.conf ? `${field.conf.title}: ${field.conf.value}` : ''}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      config: {
        title: '爸爸生日',
        name: 'birthday',
        value: '',
        placeholder: '请选择',
        valueFormat: 'yyyy/mm/dd',
        textFormat: 'yyyy年mm月dd日',
        startYear: '',
        endYear: '',
        yearsLength: '10',
        offsetYear: '-1',
        disabled: false,
        pickerTitle: 'hello',
        pickerCancelBtnText: 'cancel',
        pickerConfirmBtnText: 'confirm',
        textPosition: 'right',
        rules: [
          {
            validator: (rule, value, cb) => {
              console.log(value)
              let d = new Date(value)
              let y = d.getFullYear()
              if (y >= 2024) {
                return new Error('father is too old')
              }
              cb()
            },
            trigger: 'select'
          }
        ],
        mode: ''
      },
      config1: {
        title: '妈妈出生年份',
        value: '',
        valueFormat: 'yyyy',
        textFormat: 'yyyy年',
        textPosition: 'right',
        columnsOrder: ['year']
      },
      config2: {
        title: '哥哥出生日期',
        value: '1988/10',
        startYear: '1970',
        endYear: '2030',
        valueFormat: 'yyyy/mm',
        textFormat: 'yyyy年mm月',
        columnsOrder: ['year', 'month']
      },
      config3: {
        title: '妹妹出生日期',
        value: '',
        mode: 'to-top'
      },
      fields: []
    }
  },
  mounted () {
    this.fields = this.$children.filter(component => component.$options.name === 'r-select-date')
  },
  methods: {
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.result {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  font-size: 14px;
  color: #333333;
  padding: 10px;
  background-color: lightgray;
  line-height: 30px;
}
</style>
