<template>
  <div class="select-example">
    <Titlebar theme="b"
              @on-back="onBack">select</Titlebar>
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
.select-example {
  .title {
    font-size: 14px;
    margin-top: 30px;
  }
}
</style>
