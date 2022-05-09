<template>
  <div class="checkbox-example">
    <r-titlebar theme="b"
              @on-back="onBack">Radio</r-titlebar>
    <div class="p-15">
      <div class="fs-14">一，单个Radio，绑定到布尔值：</div>
      <r-radio v-model="single">Radio</r-radio>
      <div class="fs-14">{{single}}</div>

      <br><br>
      <div class="fs-14">二，多个Radio，绑定到同一个字符串：</div>
      <r-radio v-model="picked"
             value="apple">苹果</r-radio>
      <r-radio v-model="picked"
             value="pear">梨</r-radio>
      <r-radio v-model="picked"
             value="banana">香蕉</r-radio>
      <div class="fs-14">{{picked}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      single: false,
      picked: 'pear'
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
