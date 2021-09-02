<template>
  <FlexFixed :hideFooterOnKeyboardShow="true"
             @on-scroll="onScroll"
             @on-scroll-debounce="onScrollDebounce">
    <Titlebar theme="b"
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
      <p v-for="item in list">{{item}}</p>
      <p><input type="text"></p>
    </div>
    <ViewSource :code="sourceCode" />
    <Button slot="footer">提交</Button>
  </FlexFixed>
</template>

<script>
import sourceCode from './code.txt'

export default {
  data () {
    let list = []
    for (var i = 0; i < 100; i++) {
      list.push(Math.random())
    }
    return {
      list: list,
      scrollInfo: {},
      scrollInfo2: {},
      direction: '',
      sourceCode
    }
  },
  methods: {
    onScroll (scrollInfo) {
      this.scrollInfo = scrollInfo
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
