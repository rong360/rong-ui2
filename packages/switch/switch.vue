
<template>
  <div :class="bem([{checked: onOff, disabled: disabled}])" @click="clickSwitch" ref="switch">
    <div :class="bem('inner')">
      <div :class="bem('open')"><slot name="open"></slot></div>
      <div :class="bem('close')"><slot name="close"></slot></div>
    </div>
    <div :class="bem('circle')" ref="circle"></div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, bem } = createNamespace('switch')

export default {
  name,
  props: {
    value: Boolean,
    disabled: Boolean
  },
  data () {
    return {
      bem,
      onOff: this.value
    }
  },
  watch: {
    value: function (newVal) {
      this.onOff = newVal
    }
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
