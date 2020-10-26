<template>
  <div :class="wrapCls">
    <header @touchmove.prevent>
      <slot name="header"></slot>
    </header>
    <main :class="mainCls"
          ref="main"
          @touchstart="touchstartMain"
          @touchmove="touchmoveMain"
          @scroll.passive="onScroll">
      <slot></slot>
    </main>
    <footer @touchmove.prevent>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script>
const prefixCls = 'r--flexfixed'

export default {
  name: 'FlexFixed',
  data () {
    return {
      mainScrollTop: 0,
      mainMaxScrollTop: 0,
      mouseInfo: {
        startX: 0,
        startY: 0,
        direction: ''
      }
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`
      ]
    },
    mainCls () {
      return `${prefixCls}-main`
    }
  },
  methods: {
    onScroll (e) {
      let mainScrollTop = this.$refs.main.scrollTop
      let mainScrollDirection = this.getMainScrollDirection(this.$refs.main.scrollTop, this.mainScrollTop)
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
      this.mainScrollTop = mainScrollTop
    },
    touchstartMain (e) {
      this.mouseInfo.startX = e.targetTouches[0].clientX
      this.mouseInfo.startY = e.targetTouches[0].clientY
      this.mainMaxScrollTop = this.$refs.main.scrollHeight - this.$refs.main.offsetHeight
      this.mainScrollTop = this.$refs.main.scrollTop
    },
    touchmoveMain (e) {
      this.mouseInfo.direction = this.getDirection(this.mouseInfo.startX, this.mouseInfo.startY, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      if ((this.mouseInfo.direction == 2 && this.mainScrollTop == 0) || (this.mouseInfo.direction == 1 && this.mainScrollTop >= this.mainMaxScrollTop)) {
        e.preventDefault();
        e.stopPropagation();
      }
    },
    // 获得角度
    getAngle (angx, angy) {
      return Math.atan2(angy, angx) * 180 / Math.PI
    },
    // 根据起点终 点返回方向 1向上 2向下 3向左 4向右 0未滑动
    getDirection (startx, starty, endx, endy, oldx, oldy) {
      var angx = endx - startx;
      var angy = endy - starty;
      var result = 0;

      // 如果滑动距离太短
      if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
        return result
      }
      var angle = this.getAngle(angx, angy);
      if (angle >= -135 && angle <= -45) {
        result = 1
      } else if (angle > 45 && angle < 135) {
        result = 2
      } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
        result = 3
      } else if (angle >= -45 && angle <= 45) {
        result = 4
      }
      return result
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
