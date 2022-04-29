<template>
  <div :class="wrapCls"
       ref="swiper">
    <div :class="wraperCls"
         ref="swiperWraper">
      <div :class="innerCls"
           ref="swiperInner"
           @touchstart="tsSwiperInner"
           @touchmove="tmSwiperInner"
           @touchend="teSwiperInner">
        <div class="list"
             ref="list">
          <slot></slot>
        </div>
        <div class="list-copy"
             ref="listCopy"></div>
      </div>
    </div>
    <slot name="pagination">
      <div :class="pagination">
        <span v-for="(item, index) in list"
              :key="index"
              :class="{active: index==pointer}"></span>
      </div>
    </slot>
    <!-- <button @click="prev">prev</button> <button @click="next">next</button> -->
  </div>
</template>

<script>
import { oneOf } from '../_utils/assist.js'
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('swiper')

export default {
  name,
  provide () {
    return {
      swiper: this
    }
  },
  props: {
    // 运动方向
    direction: {
      type: String,
      validator (value) {
        return oneOf(value, ['scrollLeft', 'scrollTop'])
      },
      default: 'scrollLeft'
    },
    // 运动间隔时长
    gap: {
      type: Number,
      default: 2000
    },
    // 自动播放
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      list: [],
      mark: 0,
      maxScroll: 0, // 最大移动距离
      distance: 0, // 一次运动距离
      startCoor: 0, // 鼠标起始位置
      lastScroll: 0, // 上一次滚动位置
      swiperWidth: 0,
      swiperHeight: 0,
      mouseInfo: {
        startX: 0,
        startY: 0
      }
    }
  },
  computed: {
    wrapCls () {
      return [
        prefixCls,
        `${prefixCls}-direction-${this.direction == 'scrollLeft' ? 'left' : 'top'}`
      ]
    },
    wraperCls () {
      return `${prefixCls}-wraper`
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    listCls () {
      return `${prefixCls}-list`
    },
    pagination () {
      return `${prefixCls}-pagination`
    },
    pointer () {
      return this.mark < this.list.length ? this.mark : 0
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$refs.listCopy.innerHTML = this.$refs.list.innerHTML
      this.maxScroll = this.direction == 'scrollLeft' ? this.$refs.list.offsetWidth : this.$refs.list.offsetHeight
      this.distance = this.maxScroll / this.list.length || 0
      this.swiperWidth = this.$refs.swiper.offsetWidth
      this.swiperHeight = this.$refs.swiper.offsetHeight
      this.$emit('on-page', this.pointer + 1, this.list.length)
      this.startAnimation()
    })
  },
  methods: {
    tsSwiperInner (e) {
      clearTimeout(this.gapTimer)
      this.lastScroll = this.$refs.swiperWraper[this.direction]
      this.startCoor = e.changedTouches[0][this.direction == 'scrollLeft' ? 'clientX' : 'clientY']
      this.mouseInfo.startX = e.changedTouches[0].clientX
      this.mouseInfo.startY = e.changedTouches[0].clientY
    },
    tmSwiperInner (e) {
      let currCoor = e.changedTouches[0][this.direction == 'scrollLeft' ? 'clientX' : 'clientY']
      if (this.list.length <= 1) return
      if (currCoor > this.startCoor && this.lastScroll == 0) {
        this.$refs.swiperWraper[this.direction] = this.lastScroll = this.maxScroll
        this.mark = this.list.length
      }
      this.$refs.swiperWraper[this.direction] = this.lastScroll + this.startCoor - currCoor
      if (Math.abs(e.changedTouches[0].clientX - this.mouseInfo.startX) > Math.abs(e.changedTouches[0].clientY - this.mouseInfo.startY)) {
        e.preventDefault()
      }
    },
    teSwiperInner (e) {
      let endCoor = e.changedTouches[0][this.direction == 'scrollLeft' ? 'clientX' : 'clientY']
      let movePercent = Math.abs(this.startCoor - endCoor) / (this.direction == 'scrollLeft' ? this.swiperWidth : this.swiperHeight) * 100
      if (this.list.length <= 1) return
      if (movePercent > 20) {
        endCoor > this.startCoor ? this.prev() : this.next()
      } else {
        if (endCoor > this.startCoor && this.lastScroll == this.maxScroll) {
          this.$refs.swiperWraper[this.direction] = this.lastScroll = 0
          this.mark = 0
        }
        this.$refs.swiperWraper[this.direction] = this.lastScroll
        this.startAnimation()
      }
    },
    // 启动动画
    startAnimation () {
      if (!this.autoPlay || this.list.length <= 1) return
      this.gapTimer = setTimeout(() => {
        this.next()
      }, this.gap);
    },
    next () {
      this.mark += 1
      this.moving()
    },
    prev () {
      if (this.mark == 0) {
        this.$refs.swiperWraper[this.direction] = this.maxScroll
        this.mark = this.list.length
      }
      this.mark -= 1
      this.moving()
    },
    moving () {
      let self = this
      if (self.gapTimer) clearTimeout(self.gapTimer)
      move({
        obj: this,
        beginningValue: this.$refs.swiperWraper[this.direction],
        endValue: this.mark * self.distance,
        step (v) {
          self.$refs.swiperWraper[self.direction] = v
        },
        callback () {
          let d = self.$refs.swiperWraper[self.direction]
          if (d >= self.maxScroll) {
            self.$refs.swiperWraper[self.direction] = 0
            self.mark = 0
          }
          if (self.gapTimer) clearTimeout(self.gapTimer)
          self.$emit('on-page', self.mark + 1, self.list.length)
          self.startAnimation()
        }
      })
    }
  },
  beforeDestroy () {
    clearInterval(this.moveTimer)
    clearTimeout(this.gapTimer)
  }
}
/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
*/
const Tween = {
  linear: function (t, b, c, d) { // 匀速
    return c * t / d + b;
  }
}

function move ({ obj, beginningValue, endValue, step, callback }) {
  if (obj.isMoving) return
  obj.isMoving = true
  let b = beginningValue // 初始化值
  let c = endValue - beginningValue // 变化值
  let d = 300; // 持续时间
  let sTime = new Date().getTime();
  clearInterval(obj.moveTimer)
  obj.moveTimer = setInterval(function () {
    let eTime = new Date().getTime()
    let t = eTime - sTime;
    if (t >= d) t = d
    step && step(Tween.linear(t, b, c, d))
    if (t >= d) {
      clearInterval(obj.moveTimer)
      callback && callback()
      obj.isMoving = false
    }
  }, 10)
}
</script>
