<template>
  <div :class="wrapCls"
       ref="banner"
       style="padding: 30px 0; background: red">
    {{translateX}} -- {{maxTranslateX}}
    <div :class="innerCls"
         :style="innerStyle"
         ref="bannerInner"
         @touchstart="touchstartBannerInner"
         @touchmove="touchmoveInner"
         @touchend="touchendBannerInner">
      <slot></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
// import startMove from '../../utils/move'
const prefixCls = 'r--banner'

export default {
  name: 'Banner',
  provide () {
    return {
      banner: this
    }
  },
  data () {
    return {
      list: [],
      translateX: 0,
      lastTranslateX: 0,
      maxTranslateX: 0,
      bannerWidth: 0,
      startX: 0,
      pointer: 0,
      direction: '',
      timer: null
    }
  },
  computed: {
    wrapCls () {
      return [
        prefixCls
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    innerStyle () {
      return {
        'transform': `translateX(${this.translateX}px)`
      }
    },
    bannerAmount () {
      return this.list.length / 2
    }
  },
  watch: {
    pointer (newVal, oldVal) {
      let translateX = -this.pointer * this.bannerWidth
      this.moveBanner(translateX, this.translateX)
    }
  },
  mounted () {
    this.$nextTick(function () {
      this.maxTranslateX = this.$refs.bannerInner.scrollWidth / 2
      this.bannerWidth = this.$refs.banner.offsetWidth
      let translateX = -this.pointer * this.bannerWidth
      this.moveBanner(translateX, this.translateX)
    })
  },
  methods: {
    touchstartBannerInner (e) {
      // if (this.isMoving) return
      this.startX = e.changedTouches[0].clientX
      this.lastTranslateX = this.translateX
    },
    touchmoveInner (e) {
      // if (this.isMoving) return
      this.direction = e.changedTouches[0].clientX < this.startX ? 'left' : 'right'
      if (this.direction == 'right' && this.lastTranslateX == 0) {
        this.translateX = this.lastTranslateX = -this.bannerAmount * this.bannerWidth
      } else if (this.direction == 'left' && this.lastTranslateX == -this.maxTranslateX) {
        this.translateX = this.lastTranslateX = 0
      }
      this.translateX = this.lastTranslateX + (e.changedTouches[0].clientX - this.startX)
      // this.$refs.bannerInner.style.transform = `translateX(${this.translateX}px)`
    },
    touchendBannerInner (e) {
      let movePercent = Math.abs(this.startX - e.changedTouches[0].clientX) / this.bannerWidth * 100
      let translateX = 0
      if (movePercent > 20) {
        if (this.direction == 'right') {
          translateX = this.lastTranslateX + this.bannerWidth
        } else {
          translateX = this.lastTranslateX - this.bannerWidth
        }
      } else {
        translateX = this.lastTranslateX
      }
      this.moveBanner(translateX, this.translateX)
    },
    moveBanner (endVal, startVal) {
      if (this.timer) clearInterval(this.timer)
      if (this.isMoving) return
      this.isMoving = true
      let time = 300;
      let sTime = new Date().getTime();
      let b = startVal
      let c = endVal - startVal
      let that = this

      this.timer = setInterval(function () {
        let eTime = new Date().getTime()
        let t = eTime - sTime;
        if (t >= time) t = time
        that.translateX = Tween.linear(t, b, c, time)
        if (t >= time) {
          clearInterval(that.timer)
          that.timer = null
          that.isMoving = false
        }
      }, 10)
    }
  }
}

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
*/
var Tween = {
  linear: function (t, b, c, d) {  // 匀速
    return c * t / d + b;
  }
}
</script>

<style lang="less">
@bannerCls: r--banner;
.@{bannerCls} {
  position: relative;
  width: 100%;
  overflow: hidden;
  &-inner {
    display: flex;
    position: relative;
  }
  &-inner-transition &-inner {
    transition: transform 0.5s ease-out;
  }
}
</style>
