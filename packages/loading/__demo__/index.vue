<template>
  <div class="loading-example">
    <r-titlebar theme="b"
              @on-back="onBack">Loading</r-titlebar>
    <div class="p-20">
      <nav-item class="item"
           @on-click="showLoading0">默认</nav-item>
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

export default {
  name: "loadingExample",
  methods: {
    showLoading0 () {
      let loading = this.$loading();
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
          width: 140,
          cwidth: 40,
          textFontSize: 32,
          color: '#e0a711',
          textColor: '#e0a711'
        }
      })

      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading4 () {
      this.$dialog({
        propsData: {
          message: `
<div style="width: 100%; overflow: scroll;" class="scroll-area">
<pre>
  注册Loading组件之前添加Loading.config配置文件即可，如：
  import {Loading, Input, Titlebar} from 'rong-ui2'
  Loading.config({
    loading: require('./components/LoadingCattle.vue')
  })
  Vue.use(Loading)
</pre>
</div>
          `,
          showCancelBtn: false
        },
        methods: {
          onConfirm () {
            this.remove()
          }
        }
      })
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less">
</style>
