<template>
  <div :class="wrapCls"
       ref="banner">
    <div :class="innerCls"
         ref="bannerInner"
         @touchstart="touchstartBannerInner"
         @touchmove.prevent="touchmoveInner"
         @touchend="touchendBannerInner">
      <slot></slot>
      <slot></slot>
    </div>
  </div>
</template>

<script>
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
      pointer: 1,
      addTransition: true
    }
  },
  computed: {
    wrapCls () {
      return [
        prefixCls,
        {
          [`${prefixCls}-inner-transition`]: this.addTransition
        }
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    bannerAmount () {
      return this.list.length / 2
    }
  },
  watch: {
    pointer (newVal, oldVal) {
      this.moveBanner()
    }
  },
  mounted () {
    this.$nextTick(function () {
      let bannerWidth = this.$refs.banner.offsetWidth
      let bannerInnerWidth = this.$refs.bannerInner.scrollWidth
      this.maxTranslateX = bannerInnerWidth / 2
      this.bannerWidth = bannerWidth
      this.moveBanner()
    })
  },
  methods: {
    touchstartBannerInner (e) {
      this.addTransition = false
      this.startX = e.changedTouches[0].clientX
      this.lastTranslateX = this.translateX
    },
    touchmoveInner (e) {
      let translateX = this.lastTranslateX + (e.changedTouches[0].clientX - this.startX)
      if (translateX >= 0) {
        translateX = -this.maxTranslateX
      } else if (translateX <= -this.maxTranslateX) {
        translateX = 0
      }
      this.translateX = translateX
    },
    touchendBannerInner (e) {
      let pointer = this.pointer
      let endX = e.changedTouches[0].clientX
      let movePercent = Math.abs(this.startX - endX) / this.bannerWidth * 100
      this.addTransition = true
      if (movePercent > 20) {
        if (endX > this.startX) {
          pointer -= 1
        } else {
          pointer += 1
        }
        if (pointer < 0) {
          pointer = this.bannerAmount - 1
        }
        this.pointer = pointer
      } else {
        this.moveBanner()
      }
    },
    moveBanner () {
      this.translateX = -this.bannerWidth * this.pointer
      // this.pointer = this.pointer % this.bannerAmount
    }
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
