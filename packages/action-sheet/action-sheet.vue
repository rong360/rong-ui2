<template>
  <div v-if="showWrap"
       :class="bem()">
    <transition appear
                :name="bem('fade')">
      <div v-if="show"
           :class="bem('mask')"
           v-preventscroll
           @click="handleMask"></div>
    </transition>
    <transition appear
                :name="bem('slide-in-up')"
                v-on:enter="enter"
                v-on:after-leave="afterLeave">
      <div v-if="show"
           v-preventscroll
           :class="bem('content', {radius: radius})">
        <div :class="bem('header')"
             v-html="title"></div>
        <div v-if="showCloseBtn"
             :class="bem('close')"
             @click="handleClose"></div>
        <slot>
          <div :class="[bem('list'), {'scroll-area': isScrollY}]"
               ref="list">
            <div v-for="(item, index) in actions"
                 :style="item"
                 :class="bem('item', {disabled: item.disabled})"
                 :key="index"
                 @click="handleSelect(item, index)">{{item.name}}</div>
          </div>
        </slot>
        <div v-if="showCancelBtn"
             :class="bem('gap')"></div>
        <div v-if="showCancelBtn"
             :class="bem('cancel')"
             @click="handleCancel">{{cancelBtnText}}</div>

      </div>
    </transition>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
import preventscroll from '../_directives/preventscroll'
const { name, bem } = createNamespace('action-sheet')

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
      bem,
      showWrap: false,
      show: false,
      isScrollY: false
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
