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
        value: '',
        type: '',
        placeholder: '请选择',
        valueFormat: 'yyyy/mm/dd',
        textFormat: 'dd/mm/yyyy',
        startYear: '',
        endYear: '',
        yearsLength: '4',
        disabled: false,
        pickerYearUnit: '',
        pickerMonthUnit: '',
        pickerDateUnit: '',
        pickerTitle: 'hello',
        pickerCancelBtnText: 'cancel',
        pickerConfirmBtnText: 'confirm'
      },
      config1: {
        type: 'year',
        valueFormat: 'yyyy',
        textFormat: 'yyyy年'
      },
      config2: {
        value: '1988/10',
        type: 'month',
        valueFormat: 'yyyy/mm',
        textFormat: 'yyyy年mm月'
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
