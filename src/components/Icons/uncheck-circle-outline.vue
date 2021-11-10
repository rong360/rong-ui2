<template>
  <Icon :class="wrapCls">
    <svg width="1em"
         height="1em"
         viewBox="0 0 16 16">
      <g stroke="none"
         stroke-width="1"
         fill="none"
         fill-rule="evenodd">
        <circle stroke="currentColor"
                cx="8"
                cy="8"
                r="6.5"></circle>
      </g>
    </svg>
  </Icon>
</template>

<script>
import Icon from './icon'

const prefixCls = 'r--icon-uncheck-circle'

export default {
  name: 'UnCheckCircle',
  components: { Icon },
  computed: {
    wrapCls () {
      return prefixCls
    }
  }
}
</script>
