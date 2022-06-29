<template>
  <div :class="wrapCls">
    <div class="l-operate">
      <slot name="l">
        <div class="back"
             v-if="showBackto"
             @click="onBack"><svg width="1em"
               viewBox="0 0 10 21">
            <g stroke="none"
               stroke-width="1"
               fill="none"
               fill-rule="evenodd"
               stroke-linecap="round">
              <g transform="translate(-16.000000, -33.000000)"
                 stroke="currentColor">
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
const { name, bem, class: prefixCls } = createNamespace('titlebar')

export default {
  name,
  props: {
    title: String,
    theme: {
      type: String,
      default: 'a'
    },
    showBackto: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      bem
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        `${prefixCls}-theme-${this.theme}`
      ]
    }
  },
  methods: {
    onBack (e) {
      this.$emit('on-back', e)
    }
  }
}
</script>
