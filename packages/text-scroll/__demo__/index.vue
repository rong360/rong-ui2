<template>
  <div class="textscroll-example">
    <Titlebar theme="b"
              @on-back="onBack">TextScroll</Titlebar>
    <div class="fs-14">1, 默认</div>
    <TextScroll :list="list"></TextScroll>
    <br>
    <r-textscroll :list="list"></r-textscroll>

    <br><br>
    <div class="fs-14">2, 插槽</div>
    <TextScroll :list="list"><span slot="prepend" style="padding: 0 10px"> Tips:</span></TextScroll>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        '让子弹飞一会儿，网络流行词，是2010年末上映的电影《让子弹飞》中的一句对白。'
      ]
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
