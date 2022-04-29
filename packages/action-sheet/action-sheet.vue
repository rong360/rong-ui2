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
                 :key="index"
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
import { createNamespace } from '../_utils'
import preventscroll from '../_directives/preventscroll'
const { name, class: prefixCls } = createNamespace('action-sheet')

export default {
  name,
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
      this.show = false
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
