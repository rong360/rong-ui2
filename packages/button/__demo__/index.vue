<template>
  <div class="button-example">
    <Titlebar theme="b"
              @on-back="onBack">Button</Titlebar>

    <div class="title">default</div>
    <r-button>提交</r-button>

    <div class="title">空心默认圆角按钮（:fill="false" :radius="true"）</div>
    <Button :fill="false"
            :radius="true">提交</Button>

    <div class="title">示警按钮（type="warning"）</div>
    <Button type="warning">提交</Button>

    <div class="title">空心示警按钮(type="warning" :fill="false" :radius="true")</div>
    <Button type="warning"
            :fill="false"
            :radius="true">提交</Button>

    <div class="title">不可用按钮（type="disabled"）</div>
    <Button type="disabled">提交</Button>

    <div class="title">不可用按钮（type="disabled" :fill="false" :radius="true"）</div>
    <Button type="disabled"
            :fill="false"
            :radius="true">提交</Button>

    <div class="title">自定义（type="dark-yellow", 样式表里定义.r--button-dark-yellow相关样式 ）</div>
    <Button type="dark-yellow">提交2</Button>

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
.r--button-dark-yellow {
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
