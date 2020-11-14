<template>
  <div class="steps-example">
    <Titlebar theme="b"
              @on-back="onBack">Steps</Titlebar>

    <div class="fs-14">1，默认</div>
    <div class="box">
      <Steps :current="current">
        <Step>基本信息<br>utama</Step>
        <Step>个人信息<br>darurat</Step>
        <Step>联系人<br>wajah</Step>
        <Step>活体识别<br>wajah</Step>
      </Steps>
    </div>

    <br><br>

    <div class="fs-14">2，自定义icon和间隔线样式</div>
    <div class="box">
      <Steps :current="current"
             :progressLine="{backgroundColor:'#F43838'}"
             :notProgressLine="{backgroundColor:'lightgray'}">
        <Step><div class="icon" slot="icon"></div>基本信息<br>utama</Step>
        <Step><div class="icon gray" slot="icon"></div>个人信息<br>darurat</Step>
        <Step><div class="icon gray" slot="icon"></div>联系人<br>wajah</Step>
        <Step><div class="icon gray" slot="icon"></div>活体识别<br>wajah</Step>
      </Steps>
    </div>
    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      current: 2,
      sourceCode
    }
  },
  mounted () {
    // setTimeout(() => {
    //   this.current = 3
    // }, 2000);
  },
  methods: {
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.steps-example {
  .box {
    background: #ffffff;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    border-radius: 8px;
    margin: 20px 20px 0 20px;
    padding: 15px 0;
  }
  .icon {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color:darkturquoise;
    &.gray {
      background-color: lightgrey;
    }
  }
}
</style>
