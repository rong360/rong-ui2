<template>
  <div class="r-demo-nav__item"
       @click="handleClick">
    <slot></slot>
    <svg viewBox="0 0 1024 1024">
      <path fill="#B6C3D2"
            d="M601.1 556.5L333.8 289.3c-24.5-24.5-24.5-64.6 0-89.1s64.6-24.5 89.1 0l267.3 267.3c24.5 24.5 24.5 64.6 0 89.1-24.5 24.4-64.6 24.4-89.1-.1z"></path>
      <path fill="#B6C3D2"
            d="M690.2 556.5L422.9 823.8c-24.5 24.5-64.6 24.5-89.1 0s-24.5-64.6 0-89.1l267.3-267.3c24.5-24.5 64.6-24.5 89.1 0 24.5 24.6 24.5 64.6 0 89.1z"></path>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    to: String,
    url: String
  },
  methods: {
    handleClick (e) {
      const { to, url } = this.$props

      if (to) {
        this.$router.push(to)
      } else if (url) {
        location.href = url
      }

      this.$emit('on-click', e)
    }
  }
}
</script>

<style lang="less">

</style>
