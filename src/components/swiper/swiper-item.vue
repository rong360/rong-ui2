<template>
  <div :class="wrapCls" :style="styleObj" ref="wrap" @click="onClick">
    <slot></slot>
  </div>
</template>

<script>
const prefixCls = 'r--swiper-item'

export default {
  name: 'SwiperItem',
  inject: {
    swiper: { default: null }
  },
  props: {
    styleObj: Object
  },
  computed: {
    wrapCls () {
      return [prefixCls]
    }
  },
  mounted () {
    this.swiper.list.push(this)
  },
  methods: {
    onClick (e) {
      this.$emit('on-click', e)
    }
  }
}
</script>

<style lang="less">
@swiperItemCls: r--swiper-item;
.@{swiperItemCls} {
  img {
    width: 100%;
    display: block;
  }
}
</style>
