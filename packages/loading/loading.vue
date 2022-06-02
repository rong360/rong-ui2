<template>
  <div :class="bem()">
    <component :is="loading" v-bind="$props"
               v-if="loading">
      {{ text }}
    </component>
    <template v-else>
      <div :class="bem('container')">
        <span :class="bem('icon', type)" :style="iconStyle">
          <svg :class="bem('circular')" viewBox="25 25 50 50" v-if="type === 'circular'">
            <circle cx="50" cy="50" r="20" fill="none" />
          </svg>
          <template v-if="type === 'spinner'">
            <i v-for="n in 12" :key="n"></i>
          </template>
        </span>
        <div :class="bem('text')" v-html="text" v-if="text" :style="textStyle"></div>
      </div>
    </template>
  </div>
</template>
<script>
import { createNamespace } from '../_utils'
const { name, bem } = createNamespace('loading')

export default {
  name,
  data () {
    return {
      bem
    }
  },
  props: {
    type: {
      type: String,
      default: 'circular'
    },
    text: {
      type: String,
      default: ""
    },
    iconStyle: Object,
    textStyle: Object,
    // hash变化时移除dialog
    removeDialogOnHashChange: {
      type: Boolean,
      default: false
    },
    // 自定义loading
    loading: Object
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
