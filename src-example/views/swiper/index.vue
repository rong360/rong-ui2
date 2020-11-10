<template>
  <div class="Swiper-example">
    <Titlebar theme="b"
              @on-back="onBack">Swiper</Titlebar>
    <p class="fs-14">1，默认</p>
    <Swiper>
      <SwiperItem @on-click="onClickSwiperItem"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123209/30/16604/143626/5f9bb747Ea155ae71/aadf80788d17d8e0.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/154196/24/3833/121212/5f97d34cEa985896f/e20033d24c553704.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146862/39/13822/78049/5fa7e418E6c76569b/068b19049e17de7b.jpg!q70.jpg.dpg" /></SwiperItem>
    </Swiper>

    <br><br>

    <p class="fs-14">2，自定义页码</p>
    <Swiper @on-page="onPage">
      <SwiperItem @on-click="onClickSwiperItem"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123209/30/16604/143626/5f9bb747Ea155ae71/aadf80788d17d8e0.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/154196/24/3833/121212/5f97d34cEa985896f/e20033d24c553704.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146862/39/13822/78049/5fa7e418E6c76569b/068b19049e17de7b.jpg!q70.jpg.dpg" /></SwiperItem>
      <div slot="pagination"
           style="position: absolute; bottom: 10px; right: 30px; font-size: 14px">{{curretPage}} / {{totalPage}}</div>
    </Swiper>

    <br><br>

    <p class="fs-14">3，自定义item样式</p>
    <Swiper>
      <SwiperItem :styleObj="{width: '19rem'}"
                  @on-click="onClickSwiperItem"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123209/30/16604/143626/5f9bb747Ea155ae71/aadf80788d17d8e0.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem :styleObj="{width: '19rem'}"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/154196/24/3833/121212/5f97d34cEa985896f/e20033d24c553704.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem :styleObj="{width: '19rem'}"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146862/39/13822/78049/5fa7e418E6c76569b/068b19049e17de7b.jpg!q70.jpg.dpg" /></SwiperItem>
    </Swiper>

    <br><br>

    <p class="fs-14">4，关闭自动播放</p>
    <Swiper :auto-play="false">
      <SwiperItem @on-click="onClickSwiperItem"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123209/30/16604/143626/5f9bb747Ea155ae71/aadf80788d17d8e0.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/154196/24/3833/121212/5f97d34cEa985896f/e20033d24c553704.jpg!q70.jpg.dpg" /></SwiperItem>
      <SwiperItem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146862/39/13822/78049/5fa7e418E6c76569b/068b19049e17de7b.jpg!q70.jpg.dpg" /></SwiperItem>
    </Swiper>
    <!-- <ViewSource :code="sourceCode" /> -->
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      sourceCode,
      curretPage: 0,
      totalPage: 0
    }
  },
  methods: {
    onClickSwiperItem () {
      console.log(9)
    },
    onPage (current, total) {
      this.curretPage = current
      this.totalPage = total
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.Swiper-example {
  padding-bottom: 100px;
}
</style>
