<template>
  <div :class="wrapCls">
    <slot></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('steps')

export default {
  name,
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
