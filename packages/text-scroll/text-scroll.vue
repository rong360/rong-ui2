<template>
  <div :class="wrapCls">
    <slot name="prepend"></slot>
    <div :class="scrollbarCls"
         ref="scrollbar">
      <div :class="itemCls"
           :key="index"
           v-for="(item, index) in scrollList"
           v-html="item"></div>
    </div>
    <slot name="append"></slot>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('text-scroll')

export default {
  name,
  props: {
    list: Array,
    gap: {
      type: Number,
      default: 10
    }
  },
  data () {
    return {
      listCopyNum: 0,
      maxScrollleft: 0
    }
  },
  computed: {
    wrapCls () {
      return [`${prefixCls}`]
    },
    scrollbarCls () {
      return `${prefixCls}-scrollbar`
    },
    itemCls () {
      return `${prefixCls}-item`
    },
    scrollList () {
      let arr = []
      switch (this.list.length) {
        case 1:
          this.listCopyNum = 4
          break
        case 2:
          this.listCopyNum = 3
          break
        default:
          this.listCopyNum = 2
      }
      for (let i = 0; i < this.listCopyNum; i++) {
        arr = arr.concat(this.list)
      }
      return arr
    }
  },
  mounted () {
    this.setMaxScrollLeft()
    this.start()
  },
  updated () {
    this.setMaxScrollLeft()
  },
  methods: {
    setMaxScrollLeft () {
      this.maxScrollleft = this.$refs.scrollbar.scrollWidth / this.listCopyNum
    },
    start () {
      let self = this,
        scrollbar = this.$refs.scrollbar,
        start = null;
      function step (timestamp) {
        if (!start) start = timestamp;
        let progress = timestamp - start;

        if (progress > self.gap) {
          if (scrollbar.scrollLeft >= self.maxScrollleft) {
            scrollbar.scrollLeft = 0;
          }
          scrollbar.scrollLeft += 1;

          start = timestamp;
        }
        window.requestAnimationFrame(step);
      }
      window.requestAnimationFrame(step);
    }
  }
}
</script>
