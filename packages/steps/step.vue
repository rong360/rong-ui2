<template>
  <div :class="wrapCls">
    <div :class="headCls">
      <div class="tail-front"
           :style="frontStyle"
           ref="tailFront"></div>
      <div class="tail-back"
           :style="backStyle"
           ref="tailBack"></div>
      <div class="tail-icon">
        <slot name="icon"><span class="icon-default"></span></slot>
      </div>
      <div class="tail-icon-hidden">
        <slot name="icon"><span class="icon-default"></span></slot>
      </div>
    </div>
    <div :class="contentCls">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('step')

export default {
  name,
  inject: {
    steps: { default: null }
  },
  data () {
    return {
      index: 0,
      current: 0,
      status: false
    }
  },
  watch: {
    'steps.current': function (newVal, oldVal) {
      this.current = newVal
      this.setStatus()
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        `${this.status}`
      ]
    },
    headCls () {
      return `${prefixCls}-head`
    },
    contentCls () {
      return `${prefixCls}-content`
    },
    frontStyle () {
      return (this.index <= this.current) ? this.steps.progressLine : this.steps.notProgressLine
    },
    backStyle () {
      return this.index < this.current ? this.steps.progressLine : this.steps.notProgressLine
    }
  },
  beforeMount () {
    this.steps.list.push(this)
  },
  mounted () {
    this.index = this.steps.list.indexOf(this)
    this.current = this.steps.current
    this.setStatus()
  },
  methods: {
    setStatus () {
      if (this.index == this.current) {
        this.status = 'processing'
      } else if (this.index < this.current) {
        this.status = 'done'
      } else {
        this.status = 'undone'
      }
    }
  }
}
</script>
