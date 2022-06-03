<template>
  <div :class="wrapCls">
    <div :class="menuCls">
      <div :class="menuItemCls"
           :key="index"
           v-for="(item, index) in rContentData.menus"
           @click="onClick(item)">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, bem, class: prefixCls } = createNamespace('dialog-select')

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
  computed: {
    wrapCls () {
      return [prefixCls]
    },
    menuCls () {
      return `${prefixCls}-menu`
    },
    menuItemCls () {
      return `${prefixCls}-item`
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
