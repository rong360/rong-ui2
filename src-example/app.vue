<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
.example-list {
  padding: 15px;
  .item {
    background-color: lightseagreen;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 45px;
    padding-left: 10px;
  }
}
</style>
