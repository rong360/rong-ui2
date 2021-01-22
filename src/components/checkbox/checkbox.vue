<template>
  <label :class="wrapCls" @click.prevent="clickLabel">
    <span :class="iconCls"></span>
    <slot></slot>
  </label>
</template>

<script>
const prefixCls = 'r--checkbox'

export default {
  name: 'Checkbox',
  props: {
    checkedValue: [Boolean, Array],
    value: [String, Number, Boolean],
    shape: {
      type: String,
      default: 'square'
    }
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
        `${prefixCls}-${this.shape}`,
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
    onChange (e) {
      let checked = e.target.checked
      this.currentValue = checked
      if (typeof this.checkedValue === 'boolean') {
        this.$emit('change', checked)
      } else if (Array.isArray(this.checkedValue)) {
        let arr = this.checkedValue
        let index = arr.findIndex(item => item === this.value)
        checked && index == -1 && arr.push(this.value)
        !checked && index > -1 && arr.splice(index, 1)
        this.$emit('change', arr)
      }
      this.$emit('on-change', e)
    },
    clickLabel (e) {
      let checked = this.currentValue
      checked = !checked
      this.currentValue = checked
      if (typeof this.checkedValue === 'boolean') {
        this.$emit('change', checked)
      } else if (Array.isArray(this.checkedValue)) {
        let arr = this.checkedValue
        let index = arr.findIndex(item => item === this.value)
        checked && index == -1 && arr.push(this.value)
        !checked && index > -1 && arr.splice(index, 1)
        this.$emit('change', arr)
      }
      this.$emit('on-change', e)
    },
    getChecked (checkedValue) {
      if (typeof checkedValue === 'boolean') {
        return checkedValue
      } else if (Array.isArray(checkedValue)) {
        return checkedValue.includes(this.value)
      }
    }
  }
}
</script>

<style lang="less">
@checkboxCls: r--checkbox;

.@{checkboxCls} {
  display: inline-block;
  font-size: 14px;
  line-height: 1;
  margin-right: 8px;
  -webkit-tap-highlight-color:transparent;
  &-icon {
    display: inline-block;
    width: 16px;
    height: 16px;
    position: relative;
    border: 1px solid #dcdee2;
    background-color: #fff;
    transition: border-color 0.2s ease-in-out, background-color 0.2s ease-in-out,
      box-shadow 0.2s ease-in-out;
    vertical-align: sub;
    &:after {
      content: " ";
      display: block;
      width: 4px;
      height: 8px;
      position: absolute;
      top: 1px;
      left: 4px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      transform: rotate(45deg) scale(0);
      transition: all 0.2s ease-in-out;
    }
  }
  &-square &-icon {
    border-radius: 2px;
  }
  &-circle &-icon {
    border-radius: 50%;
  }
  &-rect {
    width: 78px;
    height: 30px;
    line-height: 30px;
    background-color: #e5e5e5;
    border-radius: 4px;
    font-size: 12px;
    text-align: center;
    margin-right: 10px;
    margin-top: 5px;
  }
  &-rect&-checked {
    background-color: #666;
    color: #fff;
  }
  &-rect &-icon {
    display: none;
  }
  &-checked &-icon {
    border-color: #2d8cf0;
    background-color: #2d8cf0;
    &::after {
      top: 2px;
      left: 5px;
      transform: rotate(45deg) scale(1);
    }
  }
}
</style>
