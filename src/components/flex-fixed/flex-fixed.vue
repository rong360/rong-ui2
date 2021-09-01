<template>
  <div :class="wrapCls"
       v-preventscroll>
    <header>
      <slot name="header"></slot>
    </header>
    <main :class="mainCls"
          ref="main"
          @touchstart="touchstartMain"
          @scroll.passive="onScroll">
      <slot></slot>
    </main>
    <footer v-show="showFooter">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
import preventscroll from '../../directives/preventscroll'
const prefixCls = 'r--flexfixed'

export default {
  name: 'FlexFixed',
  data () {
    return {
      mainScrollTop: 0,
      mainMaxScrollTop: 0,
      mainPrevScrollTop: 0,
      mouseInfo: {
        startX: 0,
        startY: 0,
        direction: ''
      },
      showFooter: true,
      docHeight: document.documentElement.clientHeight
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`
      ]
    },
    mainCls () {
      return [`${prefixCls}-main`, 'scroll-area']
    }
  },
  directives: {
    preventscroll
  },
  mounted () {
    this.hideFooterOnKeyboardShow()
  },
  methods: {
    onScroll (e) {
      let mainScrollTop = this.$refs.main.scrollTop
      let mainScrollDirection = this.getMainScrollDirection(mainScrollTop, this.mainPrevScrollTop)
      if (e.target.timer) {
        clearTimeout(e.target.timer)
      }
      e.target.timer = setTimeout(() => {
        this.$emit('on-scroll-debounce', {
          scrollTop: mainScrollTop,
          maxScrollTop: this.mainMaxScrollTop,
          direction: mainScrollDirection
        })
      }, 150)
      this.$emit('on-scroll', {
        scrollTop: mainScrollTop,
        maxScrollTop: this.mainMaxScrollTop,
        direction: mainScrollDirection
      })
      this.mainPrevScrollTop = mainScrollTop
    },
    touchstartMain (e) {
      this.mainMaxScrollTop = this.$refs.main.scrollHeight - this.$refs.main.offsetHeight
    },
    getMainScrollDirection (scrollTop, preScrollTop) {
      let direction = ''
      if (scrollTop > preScrollTop) {
        direction = 'up'
      } else if (scrollTop < preScrollTop) {
        direction = 'down'
      } else {
        direction = ''
      }
      if (scrollTop <= 0) {
        direction = 'down'
      } else if (scrollTop >= this.mainMaxScrollTop) {
        direction = 'up'
      }
      return direction
    },
    hideFooterOnKeyboardShow () {
      let self = this
      function hideFooterOnScroll () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        self.showFooter = scrollTop == 0
      }
      function hideFooterOnResize () {
        let docHeight = document.documentElement.clientHeight
        self.showFooter = docHeight == self.docHeight
      }
      document.addEventListener('scroll', hideFooterOnScroll, false)
      window.addEventListener('resize', hideFooterOnResize, false)
      this.$once('hook:beforeDestroy', function () {
        document.removeEventListener('scroll', hideFooterOnScroll, false)
        window.addEventListener('resize', hideFooterOnResize, false)
      })
    }
  }
}
</script>


<style lang="less">
@flexFixedCls: r--flexfixed;

.@{flexFixedCls} {
  display: flex;
  flex-direction: column;
  height: 100%;
  &-main {
    display: block;
    flex: 1;
    width: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; /* 解决ios滑动不流畅问题 */
  }
}
</style>
