<template>
  <div :class="wrapCls"
       :style="btnStyleObj"
       @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('button')

export default {
  name,
  props: {
    type: {
      type: String,
      default: 'default'
    },
    radius: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: true
    },
    btnStyleObj: Object
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-${this.type}`,
        {
          [`${prefixCls}-radius`]: this.radius,
          [`${prefixCls}-${this.type}-empty`]: !this.fill
        }
      ]
    }
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
