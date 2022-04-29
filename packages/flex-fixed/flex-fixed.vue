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
      <div class="main-wrap">
        <div class="header-copy"
             v-if="useFixed">
          <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="footer-copy"
             v-if="useFixed">
          <slot name="footer"></slot>
        </div>
      </div>
    </main>
    <footer v-show="showFooter">
      <slot name="footer"></slot>
    </footer>
    <slot name="extra"></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import preventscroll from '../_directives/preventscroll'
const { name, class: prefixCls } = createNamespace('flex-fixed')

export default {
  name,
  props: {
    hideFooterOnKeyboardShow: {
      type: Boolean,
      default: false
    },
    // header、footer采用position: fixed方式固定 v1.2.3
    useFixed: Boolean
  },
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
        `${prefixCls}`,
        {
          [`${prefixCls}-usefixed`]: this.useFixed
        }
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
    this.hideFooterOnKeyboardShow && this.hideFooterOnKeyboardPopup()
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
    hideFooterOnKeyboardPopup () {
      let self = this
      function hideFooterOnScroll () {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        self.showFooter = scrollTop <= 0
      }
      function hideFooterOnResize () {
        let docHeight = document.documentElement.clientHeight
        self.showFooter = (docHeight / self.docHeight) > 0.8
      }
      document.addEventListener('scroll', hideFooterOnScroll, false)
      window.addEventListener('resize', hideFooterOnResize, false)
      this.$once('hook:beforeDestroy', function () {
        document.removeEventListener('scroll', hideFooterOnScroll, false)
        window.removeEventListener('resize', hideFooterOnResize, false)
      })
    }
  }
}
</script>
