<template>
  <div :class="wrapCls">
    <slot name="start"></slot>
    <div :class="bar"
         ref="rangeBar">
      <div :class="bg">
        <div :class="progress"
             :style="progressStyle"
             ref="progress"></div>
      </div>
      <div :class="dot"
           :style="dotStyle"
           ref="dot"
           @touchstart.prevent="touchstartDot"
           @touchmove="touchmoveDot"
           @touchend="touchendDot">
        <slot name="dot"></slot>
      </div>
    </div>
    <slot name="end"></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('range')

export default {
  name,
  data () {
    return {
      maxTranslateX: 0,
      startX: 0,
      translateX: 0,
      oldTranslateX: 0,
      progressWidth: 0,
      dotWidth: 0,
      currentValue: this.value,
      isDragDot: false
    }
  },
  props: {
    value: {
      type: Number,
      default: 0
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 200000
    },
    step: {
      type: Number,
      default: 1
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-disabled`]: this.disabled
        }
      ]
    },
    bar () {
      return `${prefixCls}-bar`
    },
    progress () {
      return `${prefixCls}-progress`
    },
    bg () {
      return `${prefixCls}-bg`
    },
    dot () {
      return `${prefixCls}-dot`
    },
    progressStyle () {
      return {
        width: this.progressWidth,
        transition: this.isDragDot ? '' : 'width 0.5s'
      }
    },
    dotStyle () {
      return {
        transform: `translateX(${this.translateX}px)`,
        transition: this.isDragDot ? '' : 'transform 0.5s'
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.maxTranslateX = this.$refs.rangeBar.offsetWidth - this.$refs.dot.offsetWidth
      this.dotWidth = this.$refs.dot.offsetWidth
      this.currentValueToTranslateX()
    })
  },
  methods: {
    touchstartDot (e) {
      if (this.disabled) return
      this.startX = e.changedTouches[0].clientX
      this.oldTranslateX = this.translateX
      this.isDragDot = true
    },
    touchmoveDot (e) {
      if (this.disabled) return
      let oldTranslateX = this.oldTranslateX
      let translateX = oldTranslateX + e.changedTouches[0].clientX - this.startX
      translateX = Math.max(0, translateX)
      translateX = Math.min(translateX, this.maxTranslateX)
      let translateXRate = translateX / this.maxTranslateX
      let currentValue = this.min + (this.max - this.min) * translateXRate
      currentValue = this.fixCurrentValue(currentValue)
      this.currentValue = currentValue
    },
    touchendDot (e) {
      if (this.disabled) return
      this.isDragDot = false
      this.$emit('on-touchend', e, this.currentValue)
    },
    // 修正currentValue为step的整数倍
    fixCurrentValue (currentValue) {
      if (currentValue == this.max) {
        return this.max
      }
      let remainder = (currentValue - this.min) % this.step // 余数
      let halfStep = this.step / 2
      if (remainder < halfStep) {
        currentValue = this.min + Math.floor((currentValue - this.min) / this.step) * this.step
      } else {
        currentValue = this.min + Math.ceil((currentValue - this.min) / this.step) * this.step
      }
      if (currentValue < this.min) {
        currentValue = this.min
      } else if (currentValue > this.max) {
        currentValue = this.max
      }
      return currentValue
    },
    // currentValue变化时滑块联动
    currentValueToTranslateX () {
      this.translateX = ((this.currentValue - this.min) / (this.max - this.min)) * this.maxTranslateX
    }
  },
  watch: {
    translateX (newVal, oldVal) {
      this.progressWidth = newVal + this.dotWidth / 2 + 'px'
    },
    value (newVal, oldVal) {
      if (this.disabled) return
      this.currentValue = this.fixCurrentValue(newVal)
    },
    currentValue (newVal, oldVal) {
      this.currentValueToTranslateX()
      this.$emit('input', this.currentValue)
    }
  }
}
</script>
