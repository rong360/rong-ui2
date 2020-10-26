<template>
  <div class="toast-example">
    <Titlebar theme="b"
              @on-back="onBack">Toast</Titlebar>
    <div class="title">default</div>
    <button @click="defaultOnClick">default</button>

    <div class="title">积极文案（type="positive"）</div>
    <button @click="positiveOnClick">positive</button>

    <div class="title">消极文案（type="negetive"）</div>
    <button @click="negetiveOnClick">negetive</button>
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
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.toast-example {
  .title {
    font-size: 14px;
    margin-top: 30px;
  }
}
</style>

