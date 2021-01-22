<template>
  <div :class="wrapCls">
    <div :class="menuCls">
      <div :class="menuItemCls"
           v-for="item in rContentData.menus"
           @click="onClick(item)">{{item.title}}</div>
    </div>
  </div>
</template>

<script>
const prefixCls = 'r--dialog-select'

export default {
  name: 'dialogSelect',
  props: {
    rContentData: {
      type: Object,
      default () {
        return {}
      }
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


<style lang="less">
@dialogCls: r--dialog-select;

.@{dialogCls} {
  &-menu {
    background-color: #f3f4f7;
    padding-bottom: 10px;
  }
  &-item {
    background-color: #fff;
    border-bottom: 1px solid #d8d9dc;
    line-height: 45px;
    text-align: center;
    &:last-child {
      border-bottom: none;
    }
  }
}
</style>

