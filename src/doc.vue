<template>
  <div class="r-doc">
    <div class="r-doc-header">
      <div class="r-doc-header__logo">
        <span class="r-doc-header__title">Rong-ui2</span>
        <span class="r-doc-header__subtitle">(适用于 Vue2)</span>
      </div>
    </div>
    <div class="r-doc-nav">
      <div class="r-doc-nav__group"
           v-for="(group, index) in nav"
           :key="index">
        <div class="r-doc-nav__title">{{group.title}}</div>
        <div class="r-doc-nav__item"
             v-for="item in group.children"
             v-show="item.show"
             :key="item.name">
          <router-link :to="{name: item.name}"
                       :title="item.desc">{{item.name}} <span>{{item.title}}</span></router-link>
        </div>
      </div>
    </div>
    <div class="r-doc-container">
      <router-view></router-view>
    </div>
    <div class="r-doc-simulator">
      <div class="phone-status-bar">
        <img src="./assets/images//phtitle.png" />
        <input type="text"
               :value="pageUrl">
      </div>
      <iframe :src="pageUrl"
              frameborder="0"
              marginwidth="0"
              marginheight="0"></iframe>
    </div>
  </div>
</template>

<script>
import { nav } from './config.json'
export default {
  name: 'app',
  data: () => ({
    nav,
    page: ''
  }),
  mounted () {
    this.page = this.$route.name.toLowerCase()
  },
  beforeUpdate () {
    this.page = this.$route.name.toLowerCase()
  },
  computed: {
    pageUrl () {
      return `${location.origin}/demo.html#/${this.page}`
    }
  }
}
</script>

<style lang="less">
</style>
