<template>
  <div v-if="showWrap"
       :class="wrapCls">
    <transition appear
                name="action-sheet--fade">
      <div v-if="show"
           :class="maskCls"
           v-preventscroll
           @click="handleMask"></div>
    </transition>
    <transition appear
                name="action-sheet--slideInUp"
                v-on:enter="enter"
                v-on:after-leave="afterLeave">
      <div v-if="show"
           v-preventscroll
           :class="contentCls">
        <div :class="headerCls"
             v-html="title"></div>
        <div v-if="showCloseBtn"
             :class="closeCls"
             @click="handleClose"></div>
        <slot>
          <div :class="listCls"
               ref="list">
            <div v-for="(item, index) in actions"
                 :style="styleCls(item)"
                 :class="itemCls(item)"
                 @click="handleSelect(item, index)">{{item.name}}</div>
          </div>
        </slot>
        <div v-if="showCancelBtn"
             :class="gapCls"></div>
        <div v-if="showCancelBtn"
             :class="cancelCls"
             @click="handleCancel">{{cancelBtnText}}</div>

      </div>
    </transition>
  </div>
</template>

<script>
import preventscroll from '../../directives/preventscroll'
const prefixCls = 'action-sheet'

export default {
  name: 'ActionSheet',
  props: {
    value: Boolean, // 是否显示动作面板
    radius: Boolean, // 圆角
    title: String,
    showCloseBtn: {
      type: Boolean,
      default: false
    },
    actions: { // 面板选项列表
      type: Array,
      default: function () {
        return []
      }
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  data () {
    return {
      showWrap: false,
      show: false,
      isScrollY: false
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}--radius`]: this.radius
        }
      ]
    },
    maskCls () {
      return `${prefixCls}--mask`
    },
    contentCls () {
      return `${prefixCls}--content`
    },
    styleCls () {
      return (item) => item
    },
    listCls () {
      return [
        `${prefixCls}--list`,
        {
          'scroll-area': this.isScrollY
        }
      ]
    },
    itemCls () {
      return (item) => {
        return [
          `${prefixCls}--item`,
          {
            disabled: item.disabled
          }
        ]
      }
    },
    gapCls () {
      return `${prefixCls}--gap`
    },
    cancelCls () {
      return `${prefixCls}--cancel`
    },
    headerCls () {
      return `${prefixCls}--header`
    },
    closeCls () {
      return `${prefixCls}--close`
    }
  },
  watch: {
    value: {
      handler: function (show) {
        if (show) {
          this.showWrap = true
          this.show = true
        } else {
          this.show = false
        }
      },
      immediate: true
    }
  },
  directives: {
    preventscroll
  },
  mounted () {
    document.body.appendChild(this.$el)
  },
  beforeDestroy () {
    document.body.removeChild(this.$el)
  },
  methods: {
    handleSelect (item, index) {
      if (item.disabled) return
      this.$emit('on-select', item, index)
    },
    handleClose (e) {
      this.show = false
      this.$emit('on-close')
    },
    handleCancel (e) {
      this.show = false
      this.$emit('on-cancel', e)
    },
    handleMask (e) {
      this.$emit('on-mask', e)
    },
    enter () {
      let listEl = this.$refs.list
      if (listEl) {
        this.isScrollY = listEl.scrollHeight > listEl.offsetHeight
      }
    },
    afterLeave: function (el) {
      this.showWrap = false
      this.$emit('input', false)
      this.$emit('on-close')
    }
  }
}
</script>

<style lang="less">
@action-sheet: action-sheet;
.@{action-sheet} {
  &--mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 998;
    background-color: rgba(14, 14, 14, 0.8);
    transition: opacity 0.3s;
  }
  &--content {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background-color: #fff;
    color: #333;
    overflow: hidden;
    text-align: left;
    transition: transform 0.3s;
  }
  &--gap {
    height: 8px;
    background-color: #f7f8fa;
  }
  &--list {
    max-height: 325px;
    overflow-y: scroll;
  }
  &--item,
  &--cancel {
    line-height: 50px;
    font-size: 16px;
    text-align: center;
  }
  &--item.disabled {
    color: #c8c9cc;
  }
  &--radius &--content {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  &--header {
    font-size: 16px;
    line-height: 48px;
    text-align: center;
  }
  &--close {
    position: absolute;
    right: 15px;
    top: 13px;
    width: 14px;
    height: 14px;
    overflow: hidden;
    z-index: 2;
    &:before,
    &:after {
      display: block;
      content: "";
      width: 200%;
      height: 1px;
      overflow: hidden;
      background-color: #999;
      position: absolute;
      top: 50%;
      left: 50%;
    }
    &:before {
      transform: translateX(-50%) rotate(45deg);
    }
    &:after {
      transform: translateX(-50%) rotate(-45deg);
    }
  }
  &--slideInUp-enter,
  &--slideInUp-leave-active {
    transform: translateY(100%);
  }
  &--fade-enter,
  &--fade-leave-active {
    opacity: 0;
  }
}
</style>
