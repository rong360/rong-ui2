<template>
  <div :class="wrapCls">
    <div :class="headCls">
      <div class="tail-front" :style="frontStyle" ref="tailFront"></div>
      <div class="tail-back" :style="backStyle" ref="tailBack"></div>
      <div class="tail-icon"><slot name="icon"><span class="icon-default"></span></slot></div>
      <div class="tail-icon-hidden"><slot name="icon"><span class="icon-default"></span></slot></div>
    </div>
    <div :class="contentCls"><slot></slot></div>
  </div>
</template>

<script>
const prefixCls = 'r--step'

export default {
  name: 'Step',
  inject: {
    steps: { default: null }
  },
  props: {
    tailFrontStyle: Object,
    tailBackStyle: Object
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
      return (this.index <= this.current || this.index == this.current + 1) ? this.steps.progressLine : this.steps.notProgressLine
    },
    backStyle () {
      return this.index <= this.current ? this.steps.progressLine : this.steps.notProgressLine
    }
  },
  beforeMount () {
    this.steps.list.push(this)
  },
  mounted () {
    this.index = this.steps.list.indexOf(this) + 1
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

<style lang="less">
@stepCls: r--step;

.@{stepCls} {
  flex: 1;
  text-align: center;
  font-size: 12px;
  color: #555555;
  &.done,
  &.processing {
    .tail-front,
    .tail-back {
      background-color: #F43838;
    }
    .icon-default {
      background-color: #F43838;
      position: relative;
      &::after {
        content: " ";
        display: block;
        width: 4px;
        height: 8px;
        position: absolute;
        top: 3px;
        left: 6px;
        border: 2px solid #fff;
        border-top: 0;
        border-left: 0;
        transform: rotate(45deg) scale(1);
        transition: all .2s ease-in-out;
      }
    }
  }
  &.processing + .undone {
    .tail-front {
      background-color: #F43838;
    }
  }
  &-head {
    position: relative;
    .tail-front,
    .tail-back{
      position: absolute;
      top: 50%;
      background-color: #f5f5f5;
      height: 1px;
      width: 50%;
      overflow: hidden;
      transform: translateY(-1px);
    }
    .tail-back {
      right: 0;
    }
    .tail-icon {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      z-index: 5;
    }
    .tail-icon-hidden {
      visibility: hidden;
    }
    .icon-default {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background-color: lightgrey;
      display: inline-block;
    }
  }
  &-content {
    padding-top: 5px;
    box-sizing: border-box;
  }
}
</style>
