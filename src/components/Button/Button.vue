<template>
  <div :class="wrapCls"
       :style="btnStyleObj"
       @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--button'

export default {
  name: 'Button',
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

<style lang="less">
@buttonCls: r--button;

.@{buttonCls} {
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-sizing: border-box;
  &-default {
    color: #fff;
    background-image: -webkit-linear-gradient(0deg, #39b9ff, #4080e8);
  }
  &-default-empty {
    color: #4080e8;
    border: 1px solid #4080e8;
    background-image: none;
  }
  &-warning {
    color: #fff;
    background-image: -webkit-linear-gradient(0deg, #ff8a71, #ff3061);
  }
  &-warning-empty {
    color: #ff3061;
    border: 1px solid #ff3061;
    background-image: none;
  }
  &-disabled {
    color: #fff;
    background-color: #999;
    font-size: 16px;
  }
  &-disabled-empty {
    color: #999999;
    border: 1px solid #999999;
    background-color: #fff !important;
  }
  &-radius {
    border-radius: 5px;
  }
}
</style>
