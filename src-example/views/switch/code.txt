<template>
  <div class="switch-example">
    <Titlebar theme="b"
              @on-back="onBack">Button</Titlebar>

    <p class="fs-14">1，默认</p>
    <r-switch v-model="switchVal"></r-switch>

    <br><br>

    <p class="fs-14">2，文字或图标</p>
    <r-switch v-model="switchVal">
      <span slot="open">开</span>
      <span slot="close">关</span>
    </r-switch>

    <br><br>

    <p class="fs-14">3，禁用</p>
    <r-switch v-model="switchVal" :disabled="true"></r-switch>

    <ViewSource :code="sourceCode" />
  </div>
</template>

<script>
import sourceCode from './code.txt'
export default {
  data () {
    return {
      switchVal: false,
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
.switch-example {

}
</style>
