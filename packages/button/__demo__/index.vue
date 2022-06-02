<template>
  <div class="button-example">
    <r-titlebar theme="b"
              @on-back="onBack">Button</r-titlebar>

    <div class="title">default</div>
    <r-button>提交</r-button>

    <div class="title">空心默认圆角按钮（:fill="false" :radius="true"）</div>
    <r-button :fill="false"
              :radius="true">提交是否水电费</r-button>

    <div class="title">示警按钮（type="warning"）</div>
    <r-button type="warning">提交</r-button>

    <div class="title">空心示警按钮(type="warning" :fill="false" :radius="true")</div>
    <r-button type="warning"
              :fill="false"
              :radius="true">提交</r-button>

    <div class="title">不可用按钮</div>
      <r-button disabled>提交</r-button>

      <div class="title">不可用按钮（:fill="false" :radius="true"）</div>
      <r-button disabled
                :fill="false"
                :radius="true">提交</r-button>

      <div class="title">自定义（type="dark-yellow", 样式表里定义.r--button-dark-yellow相关样式 ）</div>
      <r-button type="dark-yellow">提交2</r-button>

    </div>
</template>

<script>

export default {
  methods: {
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.button-example {
  .title {
    font-size: 14px;
    margin-top: 30px;
  }
}
.r--button--dark-yellow {
  width: 328px;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  background: #494949;
  background-image: linear-gradient(90deg, #ff9300 16%, #ff5a00 87%);
  font-size: 18px;
  color: #fff;
  margin: 0 auto;
}
</style>
