<template>
  <div class="r-demo pl-20 pr-20 pt-40">
    <h1 class="r-demo__title">rong-ui2</h1>
    <h2 class="r-demo__desc">轻量、可靠的移动端组件库</h2>
    <div class="r-demo-nav">
      <div class="r-demo-nav__group"
           v-for="(group, index) in nav"
           :data-name="group.name"
           :key="index">
        <div class="r-demo-nav__title">{{group.title}}</div>
        <nav-item class="r-demo-nav__item"
                  v-for="item in group.children.filter(o => o.type === 'component')"
                  :to="item.name.toLowerCase()"
                  :key="item.name">{{item.name}} <span class="pl-5">{{item.title}}</span></nav-item>
      </div>
    </div>
  </div>
</template>

<script>
import { nav } from '../../config.json'

export default {
  data: () => ({
    nav
  })
}
</script>

<style lang="less" scoped>
.r-demo {
  &__title {
    margin: 0 0 16px;
    font-size: 32px;
  }
  &__desc {
    margin: 0 0 40px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }
  &-nav__title {
    margin: 24px 0 8px 16px;
    color: rgba(69, 90, 100, 0.6);
    font-size: 14px;
  }
}
</style>
