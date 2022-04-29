<template>
  <div :class="wrapCls">
    <div class="l-operate">
      <slot name="l">
        <div class="back"
             v-if="showBackto"
             @click="onBack"><svg width="10px"
               height="21px"
               :style="arrowStyle"
               viewBox="0 0 10 21"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none"
               stroke-width="1"
               fill="none"
               fill-rule="evenodd"
               stroke-linecap="round">
              <g transform="translate(-16.000000, -33.000000)"
                 :stroke="arrowStyle.color">
                <polyline id="Path-2"
                          points="25.758131 34 16 43.3837058 26 53"></polyline>
              </g>
            </g>
          </svg></div>
      </slot>
    </div>
    <div class="c-operate">
      <slot>{{title}}</slot>
    </div>
    <div class="r-operate">
      <slot name="r"></slot>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, class: prefixCls } = createNamespace('titlebar')

export default {
  name,
  props: {
    title: String,
    theme: {
      type: String,
      default: 'a'
    },
    backArrowStyle: {
      type: Object
    },
    showBackto: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-theme-${this.theme}`
      ]
    },
    arrowStyle () {
      let style = { color: '#333' }
      if (this.theme == 'b' || this.theme == 'c' || this.theme == 'd' || this.theme == 'e' || this.theme == 'f') {
        style.color = '#fff'
      }
      return this.backArrowStyle || style
    }
  },
  methods: {
    onBack (e) {
      this.$emit('on-back', e)
    }
  }
}
</script>
