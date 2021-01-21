<template>
  <div class="datepicker-example">
    <Titlebar theme="b"
              @on-back="onBack">DatePicker</Titlebar>
    <div class="fs-14">请选择以下信息：</div>
    <div class="list">
      <div class="item">
        <div class="label">爸爸生日：</div>
        <DatePicker :attrs='config'
                    @onconfirm="birthDate"></DatePicker>
      </div>
    </div>

    <div class="list">
      <div class="item">
        <div class="label">妈妈出生年份：</div>
        <DatePicker :attrs='config1'
                    @onconfirm="birthDate"></DatePicker>
      </div>
    </div>

    <div class="list">
      <div class="item">
        <div class="label">哥哥出生日期：</div>
        <DatePicker :attrs='config2'
                    @onconfirm="birthDate"></DatePicker>
      </div>
    </div>

    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      config: {
        value: '2022/10/22',
        placeholder: '请选择',
        valueFormat: 'yyyy/mm/dd',
        // textFormat: 'yyyy年mm月dd日',
        textFormat (val) {
          return `${val.year.text},${val.month.text.substr(0, 4)},${val.day.text}`
        },
        startYear: '',
        endYear: '',
        offsetYear: '',
        yearsLength: '',
        disabled: false,
        language: 'en',
        pickerFormatter: function (type, val) {
          // if (type == 'year') {
          //   return val + '年'
          // } else if (type == 'month') {
          //   return val + '月'
          // } else if (type == 'day') {
          //   return val + '日'
          // }
        },
        pickerTitle: 'hello',
        pickerCancelBtnText: 'cancel',
        pickerConfirmBtnText: 'confirm',
        columnsOrder: ['year', 'month', 'day']
      },
      config1: {
        valueFormat: 'yyyy',
        textFormat: 'yyyy年',
        columnsOrder: ['year']
      },
      config2: {
        value: '2022/10',
        valueFormat: 'yyyy/mm',
        textFormat: 'yyyy年mm月',
        columnsOrder: ['year', 'month']
      },
      sourceCode
    }
  },
  methods: {
    birthDate (date) {
      console.log(date);
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.datepicker-example {
  .list {
    font-size: 14px;
    .item {
      display: flex;
      margin-top: 20px;
      align-items: center;
      .label {
        width: 120px;
        text-align: right;
      }
      .r--datepicker {
        padding: 10px;
        border: 1px solid #efeff4;
      }
    }
  }
}
</style>
