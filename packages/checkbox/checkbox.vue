<template>
  <label :class="wrapCls"
         @click.prevent="clickLabel">
    <slot name="prepend"></slot>
    <slot name="iconCheck"
          v-if="currentValue">
      <CheckCircleOutline v-if='shape == "circle"'
                          :style="iconStyle"
                          :class="iconCls"
                          :twoToneColor="checkCircleTwoToneColor" />
      <span v-else
            :class="iconCls"></span>
    </slot>
    <slot name="iconUncheck"
          v-else>
      <UnCheckCircleOutline v-if='shape == "circle"'
                            :class="iconCls"
                            :style="iconStyle" />
      <span v-else
            :class="iconCls"></span>
    </slot>
    <slot></slot>
  </label>
</template>

<script>
import { createNamespace } from '../_utils'
import CheckCircleOutline from './check-circle-outline'
import UnCheckCircleOutline from './uncheck-circle-outline'
const { name, class: prefixCls } = createNamespace('checkbox')

export default {
  name,
  props: {
    checkedValue: [Boolean, Array],
    value: [String, Number, Boolean],
    shape: {
      type: String,
      default: 'square'
    },
    checkCircleTwoToneColor: String,
    iconStyle: [String, Object]
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
  components: {
    CheckCircleOutline,
    UnCheckCircleOutline
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
