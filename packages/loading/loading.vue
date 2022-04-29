<template>
  <div :class="wrapCls">
    <component :is="_customLoading"
               v-if="_customLoading">
      {{ text }}
    </component>
    <template v-else>
      <div class="r-content"
           :style="wrapStyle">
        <div class="r-content1">
          <div class="r-arc1"
               :style="arcStyle"></div>
          <div class="r-arc2"
               :style="arcStyle"></div>
          <div class="r-arc3"
               :style="arcStyle"></div>
          <div class="r-arc4"
               :style="arcStyle"></div>
        </div>
        <div class="r-content2">
          <div class="r-arc1"
               :style="arcStyle"></div>
          <div class="r-arc2"
               :style="arcStyle"></div>
          <div class="r-arc3"
               :style="arcStyle"></div>
          <div class="r-arc4"
               :style="arcStyle"></div>
        </div>
      </div>
      <div :class="['r-content3', textInside ? 'inside':'outside']"
           v-if="text!=''"
           :style="txtStyle"
           v-html="text" />
    </template>
  </div>
</template>
<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('loading')

export default {
  name,
  data () {
    return {}
  },
  props: {
    text: {
      type: String,
      default: ""
    },
    textInside: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 100
    },
    cwidth: {
      type: Number,
      default: 30
    },
    color: {
      type: String,
      default: ""
    },
    textColor: {
      type: String,
      default: "#fff"
    },
    textFontSize: {
      type: Number,
      default: 28
    },
    // hash变化时移除dialog
    removeDialogOnHashChange: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    txtLen () {
      return this.text.replace(/[\u0391-\uFFE5]/g, "aa").length;
    },
    wrapCls () {
      return prefixCls
    },
    wrapStyle () {
      return {
        width: this.width / 2 / 18.75 + "rem",
        height: this.width / 2 / 18.75 + "rem",
        "margin-left": -1 * this.width / 4 / 18.75 + "rem"
      }
    },
    arcStyle () {
      let style = {
        width: this.cwidth / 2 / 18.75 + "rem",
        height: this.cwidth / 2 / 18.75 + "rem"
      }
      this.color && (Object.assign(style, { "background-color": this.color }))
      return style
    },
    txtStyle () {
      let obj = {
        color: this.textColor,
        "font-size": this.textFontSize / 2 / 18.75 + "rem"
      }
      return obj;
    },
    _customLoading () {
      return this.customLoading
    }
  },
  mounted () {
    this.removeDialogOnHashChange && window.addEventListener('hashchange', this.remove);
  },
  methods: {
    remove () {
      this.$el.remove();
      this.$destroy();
      this.removeDialogOnHashChange && window.removeEventListener('hashchange', this.remove);
    }
  }
}
</script>
