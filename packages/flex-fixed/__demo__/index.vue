<template>
  <r-flexfixed :hideFooterOnKeyboardShow="true"
             :useFixed="true"
             class="flexfixed-page"
             @on-scroll="onScroll"
             @on-scroll-debounce="onScrollDebounce">
    <Titlebar :theme="theme"
              slot="header"
              @on-back="onBack">
      FlexFixed
      <div style="position:fixed; top:49px; right:0; text-align: left; padding: 10px; font-size: 14px; line-height: 24px; background-color: rgba(0, 0, 0, 0.7)">
        <p>on-scroll</p>
        <p>scrollTop：{{scrollInfo.scrollTop}}</p>
        <p>maxScrollTop：{{scrollInfo.maxScrollTop}}</p>
        <p>direction：{{scrollInfo.direction}}</p>
        <br>
        <p>on-scroll-debounce</p>
        <p>scrollTop：{{scrollInfo2.scrollTop}}</p>
        <p>maxScrollTop：{{scrollInfo2.maxScrollTop}}</p>
        <p>direction：{{scrollInfo2.direction}}</p>
      </div>
    </Titlebar>
    <div>
      <p>心存美好，则无可恼之事；心存善良，则无可恨之人；心若简单，世间纷扰皆成空</p>
      <p v-for="(item, index) in list" :key="index">{{item}}</p>
      <p><input type="text"></p>
      <p>如果有缘、错过了还会重来，如果无缘、相遇了也会离开；聚有聚的理由、离有离的借口；人生没有如果、只有后果和结果！</p>
    </div>
    <Button slot="footer">提交</Button>
  </r-flexfixed>
</template>

<script>
export default {
  data () {
    let list = []
    for (let i = 0; i < 100; i++) {
      list.push(Math.random())
    }
    return {
      list: list,
      scrollInfo: {},
      scrollInfo2: {},
      direction: '',
      theme: ''
    }
  },
  methods: {
    onScroll (scrollInfo) {
      this.scrollInfo = scrollInfo
      this.theme = scrollInfo.scrollTop > 0 ? 'e' : ''
    },
    onScrollDebounce (scrollInfo) {
      this.scrollInfo2 = scrollInfo
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
.flexfixed-page .main-wrap {
  background: url("https://img1.baidu.com/it/u=2098938867,1688028566&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500")
    no-repeat;
  background-size: contain;
}
</style>
