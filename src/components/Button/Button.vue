<template>
  <div :class="wrapCls" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--button'

// 判断参数是否是其中之一
function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      validator (value) {
        return oneOf(value, ['default', 'warning', 'disabled'])
      },
      default: 'default'
    },
    radius: {
      type: Boolean,
      default: false
    },
    fill: {
      type: Boolean,
      default: true
    }
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
    background-image: -webkit-linear-gradient(0deg, #39B9FF, #4080E8);
  }
  &-default-empty {
    color:#4080E8;
    border: 1px solid #4080E8;
    background-image: none;
  }
  &-warning {
    color: #fff;
    background-image: -webkit-linear-gradient(0deg, #FF8A71, #FF3061);
  }
  &-warning-empty {
    color:#FF3061;
    border: 1px solid #FF3061;
    background-image: none;
  }
  &-disabled {
    color: #fff;
    background-color: #999;
    font-size: 16px;
  }
  &-disabled-empty {
    color:#999999;
    border: 1px solid #999999;
    background-color: #fff !important;
  }
  &-radius {
    border-radius: 5px;
  }
}
</style>
