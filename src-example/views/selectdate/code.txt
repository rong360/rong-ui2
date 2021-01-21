<template>
  <div class="selectdate-example">
    <Titlebar theme="b"
              @on-back="onBack">SelectDate</Titlebar>

    <p class="fs-14 mt-20">1，默认</p>
    <SelectDate :attrs="config"
                v-model="config.value"></SelectDate>

    <p class="fs-14 mt-20">2，只显示年份</p>
    <SelectDate :attrs="config1"
                v-model="config1.value"></SelectDate>

    <p class="fs-14 mt-20">3，显示年、月</p>
    <SelectDate :attrs="config2"
                v-model="config2.value"></SelectDate>

    <p class="fs-14 mt-20">4，添加css效果</p>
    <SelectDate :attrs="config3"
                v-model="config3.value"></SelectDate>

    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
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
        yearsLength: '4',
        offsetYear: '',
        disabled: false,
        pickerTitle: 'hello',
        pickerCancelBtnText: 'cancel',
        pickerConfirmBtnText: 'confirm',
        textPosition: 'right',
        rules: [
          {
            validator: (rule, value, cb) => {
              console.log(value)
              var d = new Date(value)
              var y = d.getFullYear()
              if (y >= 2021) {
                return new Error('father is too yong')
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
        valueFormat: 'yyyy',
        textFormat: 'yyyy年',
        textPosition: 'right',
        columnsOrder: ['year']
      },
      config2: {
        title: '哥哥出生日期',
        value: '1988/10',
        valueFormat: 'yyyy/mm',
        textFormat: 'yyyy年mm月',
        columnsOrder: ['year', 'month']
      },
      config3: {
        title: '妹妹出生日期',
        value: '',
        mode: 'to-top'
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
</style>
