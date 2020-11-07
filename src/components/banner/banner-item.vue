<template>
  <div :class="wrapCls" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--banner-item'

export default {
  name: 'BannerItem',
  inject: {
    banner: { default: null }
  },
  computed: {
    wrapCls () {
      return [prefixCls]
    }
  },
  mounted () {
    this.banner.list.push(this)
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>

<style lang="less">
@bannerItemCls: r--banner-item;
.@{bannerItemCls} {
  width: 100%;
  flex-shrink: 0;
  text-align: center;
  min-height: 100px;
  &:nth-child(even) {
    background-color: #fff;
  }
  &:nth-child(odd) {
    background-color: #fff;
  }
}
</style>
