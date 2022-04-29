<template>
  <label :class="wrapCls" @click="clickLabel">
    <span :class="iconCls"></span>
    <slot></slot>
  </label>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('radio')

export default {
  name,
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
    clickLabel (e) {
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
