<template>
  <div class="loading-example">
    <r-titlebar theme="b"
              @on-back="onBack">Loading</r-titlebar>
    <div class="p-20">
      <nav-item class="item"
           @on-click="showLoading0">圆环形状（type="circular"）, 默认</nav-item>
      <nav-item class="item"
           @on-click="showLoading0_2">旋转形状（type="spinner"）</nav-item>
      <nav-item class="item"
           @on-click="showLoading1">添加文案</nav-item>
      <nav-item class="item"
           @on-click="showLoading2">倒计时</nav-item>
      <nav-item class="item"
           @on-click="showLoading3">改变大小、颜色、文字等</nav-item>
      <nav-item class="item"
           @on-click="showLoading4">自定义loading</nav-item>
    </div>
  </div>
</template>
<script>
import LoadingCattle from '../../../src/components/LoadingCattle.vue'

export default {
  name: "loadingExample",
  methods: {
    showLoading0 () {
      let loading = this.$loading();
      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading0_2 () {
      let loading = this.$loading({
        propsData: {
          type: 'spinner'
        }
      });
      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading1 () {
      let loading = this.$loading({
        propsData: {
          text: '灰太狼快跑！'
        }
      });
      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading2 () {
      let loading = this.$loading({
        propsData: {
          text: '3s',
          textInside: true
        }
      });
      let count = 3;
      let timer = setInterval(function () {
        count--;
        if (count == 0) {
          loading.remove();
          clearInterval(timer)
        } else {
          loading.text = count + 's';
        }
      }, 1000)
    },
    showLoading3 () {
      let loading = this.$loading({
        propsData: {
          text: 'Hello World，disappear in 2s',
          textStyle: { color: '#e0a711' },
          iconStyle: { width: '60px', height: '60px', color: 'pink' }
        }
      })

      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading4 () {
      let loading = this.$loading({
        propsData: {
          message: `自定义loading`,
          loading: (h) => h(LoadingCattle, { props: { color: 'red' } })
        }
      })

      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
</style>
