
<template>
  <div :class="wrapCls" @click="clickSwitch" ref="switch">
    <div :class="innerCls">
      <div class="open"><slot name="open"></slot></div>
      <div class="close"><slot name="close"></slot></div>
    </div>
    <div class="circle" :style="circleStyle" ref="circle"></div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('switch')

export default {
  name,
  props: {
    value: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      onOff: this.value,
      maxLeft: 0
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.onOff
        }
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    circleStyle () {
      let style = {}
      if (this.onOff) style.left = this.maxLeft + 'px'
      return style
    }
  },
  watch: {
    value: function (newVal) {
      this.onOff = newVal
    }
  },
  mounted () {
    this.maxLeft = this.$refs.switch.offsetWidth - this.$refs.circle.offsetWidth - 3
  },
  methods: {
    clickSwitch () {
      if (this.disabled) return
      this.onOff = !this.onOff
      this.$emit('input', this.onOff)
      this.$emit('on-change', this.onOff)
    }
  }
}
</script>
