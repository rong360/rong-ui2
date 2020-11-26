<template>
  <label :class="wrapCls" @touchstart.prevent="touchstartLabel">
    <span :class="iconCls"></span>
    <slot></slot>
  </label>
</template>

<script>
const prefixCls = 'r--radio'

export default {
  name: 'Radio',
  props: {
    checkedValue: [String, Boolean],
    value: [String, Number]
  },
  model: {
    prop: 'checkedValue',
    event: 'change'
  },
  data () {
    return {
      currentValue: this.getChecked(this.checkedValue)
    }
  },
  watch: {
    checkedValue: function (newVal, oldVal) {
      this.currentValue = this.getChecked(newVal)
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-checked`]: this.currentValue
        }
      ]
    },
    iconCls () {
      return `${prefixCls}-icon`
    }
  },
  methods: {
    touchstartLabel (e) {
      if (typeof this.checkedValue === 'boolean') {
        this.$emit('change', true)
      } else if (typeof this.checkedValue === 'string') {
        this.$emit('change', this.value)
      }
      this.$emit('on-change', e)
    },
    getChecked (checkedValue) {
      if (typeof checkedValue === 'boolean') {
        return checkedValue
      } else if (typeof checkedValue === 'string') {
        return checkedValue === '' ? false : checkedValue === this.value
      }
    }
  }
}
</script>

<style lang="less">
@radioCls: r--radio;

.@{radioCls} {
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  margin-right: 8px;
  &-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    border: 1px solid #dcdee2;
    border-radius: 50%;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
    box-sizing: border-box;
    vertical-align: sub;
    &:after {
      content: " ";
      display: block;
      width: 10px;
      height: 10px;
      position: absolute;
      top: 2px;
      left: 2px;
      background-color: #2d8cf0;
      opacity: 1;
      border: 0;
      border-radius: 50%;
      transition: all 0.2s ease-in-out;
      transform: scale(0);
      overflow: hidden;
    }
  }
  &-checked &-icon {
    border-color: #2d8cf0;
    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
}
</style>
