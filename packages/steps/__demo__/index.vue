<template>
  <div class="steps-example">
    <r-titlebar theme="b"
              @on-back="onBack">Steps</r-titlebar>

    <div class="fs-14 pt-30">1，默认</div>
    <div class="box">
      <r-steps :current="current">
        <r-step>基本信息<br>utama</r-step>
        <r-step>个人信息<br>darurat</r-step>
        <r-step>联系人<br>wajah</r-step>
        <r-step>活体识别<br>wajah</r-step>
      </r-steps>
    </div>

    <div class="fs-14 pt-30">2，自定义icon和间隔线样式</div>
    <div class="box">
      <r-steps :current="current"
             :progressLine="{backgroundColor:'#F43838'}"
             :notProgressLine="{backgroundColor:'#f5f5f5'}">
        <r-step>
          <div class="icon"
               slot="icon"></div>基本信息<br>utama
        </r-step>
        <r-step>
          <div class="icon gray"
               slot="icon"></div>个人信息<br>darurat
        </r-step>
        <r-step>
          <div class="icon gray"
               slot="icon"></div>联系人<br>wajah
        </r-step>
        <r-step>
          <div class="icon gray"
               slot="icon"></div>活体识别<br>wajah
        </r-step>
      </r-steps>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      current: 1
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
    background-color: darkturquoise;
    &.gray {
      background-color: lightgrey;
    }
  }
}
</style>
