<template>
  <div class="checkbox-example">
    <Titlebar theme="b"
              @on-back="onBack">Radio</Titlebar>
    <div class="fs-14">一，单个Radio，绑定到布尔值：</div>
    <Radio v-model="single">Radio</Radio>
    <div class="fs-14">{{single}}</div>

    <br><br>
    <div class="fs-14">二，多个Radio，绑定到同一个字符串：</div>
    <Radio v-model="picked"
           value="apple">苹果</Radio>
    <Radio v-model="picked"
           value="pear">梨</Radio>
    <Radio v-model="picked"
           value="banana">香蕉</Radio>
    <div class="fs-14">{{picked}}</div>
    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      single: false,
      picked: 'pear',
      sourceCode
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
