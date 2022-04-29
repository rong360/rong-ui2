<template>
  <div :class="wrapCls" :style="styleObj" ref="wrap" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('swiper-item')

export default {
  name,
  inject: {
    swiper: { default: null }
  },
  props: {
    styleObj: Object
  },
  computed: {
    wrapCls () {
      return [prefixCls]
    }
  },
  mounted () {
    this.swiper.list.push(this)
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
