<template>
  <div class="loading-example">
    <Titlebar theme="b"
              @on-back="onBack">Loading</Titlebar>
    <div class="example-list">
      <div class="item"
           @click="showLoading0">默认</div>
      <div class="item"
           @click="showLoading1">添加文案</div>
      <div class="item"
           @click="showLoading2">倒计时</div>
      <div class="item"
           @click="showLoading3">改变大小、颜色、文字等</div>
      <div class="item"
           @click="showLoading4">自定义loading</div>
    </div>
    <ViewSource :code="sourceCode" />
  </div>
</template>
<script>
import sourceCode from './code.txt'

export default {
  name: "loadingExample",
  data () {
    return {
      sourceCode: sourceCode
    }
  },
  mounted () {},
  methods: {
    showLoading0 () {
      var loading = this.$loading();
      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading1 () {
      var loading = this.$loading({
        propsData: {
          text: '灰太狼快跑！'
        }
      });
      setTimeout(function () {
        loading.remove();
      }, 2000)
    },
    showLoading2 () {
      var loading = this.$loading({
        propsData: {
          text: '3s',
          textInside: true
        }
      });
      var count = 3;
      var timer = setInterval(function () {
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
      var loading = this.$loading({
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
