<template>
  <div class="banner-example">
    <Titlebar theme="b"
              @on-back="onBack">Banner</Titlebar>
    <Banner>
      <BannerItem @on-click="onClickBannerItem">banner1</BannerItem>
      <BannerItem>banner2banner2banner2banner2banner2</BannerItem>
      <BannerItem>banner3333333</BannerItem>
    </Banner>
    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      sourceCode
    }
  },
  methods: {
    onClickBannerItem () {
      console.log(9)
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.banner-example {
}
</style>
