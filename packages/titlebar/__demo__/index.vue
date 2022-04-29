<template>
  <div class="titlebar-example pb-20">
    <Titlebar theme="b"
              @on-back="onBack">Titlebar</Titlebar>

    <div class="title">default</div>
    <r-titlebar>标题</r-titlebar>

    <div class="title">theme=b</div>
    <Titlebar theme="b">标题</Titlebar>

    <div class="title">theme=c</div>
    <Titlebar theme="c">标题</Titlebar>

    <div class="title">theme=d</div>
    <Titlebar theme="d">标题</Titlebar>

    <div class="title">theme=e</div>
    <Titlebar theme="e">标题</Titlebar>

    <div class="title">theme=f</div>
    <Titlebar theme="f">标题</Titlebar>
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
.titlebar-example {
  .title {
    font-size: 14px;
    margin-top: 30px;
  }
}
</style>
