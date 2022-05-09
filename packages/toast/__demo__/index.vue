<template>
  <div class="toast-example">
    <r-titlebar theme="b"
              @on-back="onBack">Toast</r-titlebar>
    <div class="p-20">
      <nav-item class="item"
           @on-click="defaultOnClick">默认 default</nav-item>
      <nav-item class="item"
           @on-click="positiveOnClick">积极文案（type="positive"）</nav-item>
      <nav-item class="item"
           @on-click="negetiveOnClick">消极文案（type="negetive"）</nav-item>
      <nav-item class="item"
           @on-click="callbackOnClick">消失时回调</nav-item>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    defaultOnClick () {
      this.$toast('长文本形式为文字超过十个时使用，宽度固定')
    },
    positiveOnClick () {
      this.$toast({
        propsData: {
          type: 'positive',
          message: '积极文案不超过十个字'
        }
      })
    },
    negetiveOnClick () {
      this.$toast({
        propsData: {
          type: 'negetive',
          message: '消极文案不超过十个字'
        }
      })
    },
    callbackOnClick () {
      this.$toast({
        propsData: {
          message: '消失时回调，出alert',
          callback: function () {
            alert(0)
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
