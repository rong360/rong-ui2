<template>
  <div :class="bem([type, { radius: radius, plain: !fill, disabled: _disabled }])"
       :style="btnStyleObj"
       @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, bem } = createNamespace('button')

export default {
  name,
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
    btnStyleObj: Object,
    // 是否禁用 v1.2.5
    disabled: Boolean
  },
  data () {
    return {
      bem
    }
  },
  computed: {
    _disabled () {
      return this.type.disabled ? true : this.disabled // 兼容老版通过type传递disabled
    }
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>
