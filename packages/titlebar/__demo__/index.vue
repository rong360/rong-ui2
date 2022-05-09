<template>
  <div class="titlebar-example pb-20">
    <r-titlebar theme="b"
              @on-back="onBack">Titlebar</r-titlebar>

    <div class="title">default</div>
    <r-titlebar>标题</r-titlebar>

    <div class="title">theme=b</div>
    <r-titlebar theme="b">标题</r-titlebar>

    <div class="title">theme=c</div>
    <r-titlebar theme="c">标题</r-titlebar>

    <div class="title">theme=d</div>
    <r-titlebar theme="d">标题</r-titlebar>

    <div class="title">theme=e</div>
    <r-titlebar theme="e">标题</r-titlebar>

    <div class="title">theme=f</div>
    <r-titlebar theme="f">标题</r-titlebar>
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
