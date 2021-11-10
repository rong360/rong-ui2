<template>
  <span :class="wrapCls">
    <slot></slot>
  </span>
</template>

<script>
const prefixCls = 'r--icon'

export default {
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`
      ]
    }
  }
}
</script>

<style lang="less">
@iconCls: r--icon;
.@{iconCls} {
  display: inline-block;
  line-height: 0;
  vertical-align: middle;
}
</style>
