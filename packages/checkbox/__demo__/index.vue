<template>
  <div class="checkbox-example">
    <r-titlebar theme="b"
              @on-back="onBack">Checkbox</r-titlebar>
    <div class="fs-14">一，单个复选框，绑定到布尔值：</div>
    <r-checkbox v-model="checked" shape="circle">北京</r-checkbox>
    <div class="fs-14">{{checked}}</div>

    <br><br>
    <div class="fs-14">二，多个复选框，绑定到同一个数组：</div>
    <r-checkbox v-model="fruitList" value="apple">苹果</r-checkbox>
    <r-checkbox v-model="fruitList" value="pear">梨</r-checkbox>
    <r-checkbox v-model="fruitList" value="banana">香蕉</r-checkbox>
    <r-checkbox v-model="fruitList" value="orange">橘子</r-checkbox>
    <div class="fs-14">{{fruitList}}</div>

    <br>
    <r-checkbox v-model="fruitList" value="apple" shape="circle">苹果</r-checkbox>
    <r-checkbox v-model="fruitList" value="pear" shape="circle" iconStyle="font-size: 25px; color: red">梨</r-checkbox>
    <r-checkbox v-model="fruitList" value="banana" shape="circle" checkCircleTwoToneColor='red'>香蕉</r-checkbox>
    <r-checkbox v-model="fruitList" value="orange" shape="circle">橘子</r-checkbox>
    <div class="fs-14">{{fruitList}}</div>

    <br>
    <div class="fs-14">您需要的贷款额度（单选）</div>
    <r-checkbox v-model="loanLimitList" value="1" shape="rect" @on-change="changeLoanLimit('1')">2万以下</r-checkbox>
    <r-checkbox v-model="loanLimitList" value="2" shape="rect" @on-change="changeLoanLimit('2')">2-5万</r-checkbox>
    <r-checkbox v-model="loanLimitList" value="3" shape="rect" @on-change="changeLoanLimit('3')">5-10万</r-checkbox>
    <r-checkbox v-model="loanLimitList" value="4" shape="rect" @on-change="changeLoanLimit('4')">10-50万</r-checkbox>
    <r-checkbox v-model="loanLimitList" value="5" shape="rect" @on-change="changeLoanLimit('5')">50万以上</r-checkbox>
    <div class="fs-14">{{loanLimitList}}</div>

    <br>
    <div class="fs-14">选择您的资质, 提高贷款成功率（可多选）</div>
    <r-checkbox v-model="qualificationsList" value="1" shape="rect" @on-change="changeQualifications('1')">有房</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="2" shape="rect" @on-change="changeQualifications('2')">有车</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="3" shape="rect" @on-change="changeQualifications('3')">有公积金</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="4" shape="rect" @on-change="changeQualifications('4')">有社保</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="5" shape="rect" @on-change="changeQualifications('5')">有保单</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="6" shape="rect" @on-change="changeQualifications('6')">有企业</r-checkbox>
    <r-checkbox v-model="qualificationsList" value="0" shape="rect" @on-change="changeQualifications('0')">以上都无</r-checkbox>
    <div class="fs-14">{{qualificationsList}}</div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      checked: true,
      fruitList: ['apple', 'pear', 'banana'],
      loanLimitList: [],
      qualificationsList: []
    }
  },
  methods: {
    changeLoanLimit (v) {
      this.loanLimitList = [v]
    },
    changeQualifications (v) {
      if (v == '0') {
        this.qualificationsList = ['0']
      } else {
        let arr = this.qualificationsList
        let index = arr.findIndex(item => item === '0')
        index > -1 && arr.splice(index, 1)
        this.qualificationsList = arr
      }
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.checkbox-example {
  .r--checkbox .r--checkbox-icon {
    // color: red;
    // font-size: 20px;
  }
}
</style>
