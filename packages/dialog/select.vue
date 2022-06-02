<template>
  <div :class="bem()">
    <div :class="bem('menu')">
      <div :class="bem('item')"
           :key="index"
           v-for="(item, index) in rContentData.menus"
           @click="onClick(item)">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, bem } = createNamespace('dialog-select')

export default {
  name: name,
  props: {
    rContentData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      bem
    }
  },
  methods: {
    onClick (obj) {
      let onSelect = this.rContentData.onSelect
      onSelect && onSelect.call(this.$parent, obj)
    }
  }
}
</script>
