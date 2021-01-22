
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
const prefixCls = 'r--switch'

export default {
  name: 'r-switch',
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

<style lang="less">
@switchCls: r--switch;

.@{switchCls} {
  display: inline-block;
  height: 22px;
  border-radius: 22px;
  border: 1px solid #ccc;
  background-color: #ccc;
  box-sizing: border-box;
  position: relative;
  user-select: none;
  transition: all 0.2s ease-in-out;
  -webkit-tap-highlight-color:transparent;
  & .circle {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    vertical-align: middle;
    background-color: #fff;
    position: absolute;
    top: 1px;
    left: 1px;
    transition: left 0.2s ease-in-out, width 0.2s ease-in-out;
  }
  &-inner {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 7px;
  }
  &-inner .open,
  &-inner .close {
    color: #fff;
    font-size: 12px;
    min-width: 15px;
    box-sizing: border-box;
  }
  &-inner .open {
    opacity: 0;
  }
  &-inner .close {
    text-align: right;
  }
  &&-checked {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
  }
  &&-checked .open {
    opacity: 1;
  }
  &&-checked .close {
    opacity: 0;
  }
}
</style>
