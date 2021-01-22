<template>
  <div :class="wrapCls">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--steps'

export default {
  name: 'Steps',
  provide () {
    return {
      steps: this
    }
  },
  props: {
    current: {
      type: Number,
      default: 0
    },
    progressLine: Object,
    notProgressLine: Object
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    wrapCls () {
      return `${prefixCls}`
    },
    itemCls () {
      return `${prefixCls}-item`
    }
  }
}
</script>

<style lang="less">
@stepsCls: r--steps;
@stepCls: r--step;

.@{stepsCls} {
  display: flex;
  >:first-child{
    .tail-front {
      display: none;
    }
  }
  >:last-child{
    .tail-back {
      display: none;
    }
  }
  .@{stepCls} {
    &.active {
      .tail-front,
      .tail-back {
        background-color: #F43838;
      }
    }
  }
}
</style>
