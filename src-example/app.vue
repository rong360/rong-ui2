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
.fade-enter, .fade-leave-to{
    opacity: 0;
}
.fade-enter-active, .fade-leave-active{
    transition: opacity 0.3s;
}

.page-fade-enter, .page-fade-leave-to{
    opacity: 0.7
}
.page-fade-enter-active, .page-fade-leave-active{
    transition: opacity 0.2s;
}

</style>
