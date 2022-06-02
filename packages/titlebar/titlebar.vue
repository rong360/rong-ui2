<template>
  <div :class="bem([`theme-${theme}`])">
    <div :class="bem('left')">
      <slot name="l">
        <div :class="bem('back')"
             v-if="showBackto"
             @click="onBack"><svg width="1em"
               height="1em"
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
    <div :class="bem('title')">
      <slot>{{title}}</slot>
    </div>
    <div :class="bem('right')">
      <slot name="r"></slot>
    </div>
  </div>
</template>

<script>
import { createNamespace } from '../_utils'
const { name, bem } = createNamespace('titlebar')

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
  data () {
    return {
      bem
    }
  },
  computed: {
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
