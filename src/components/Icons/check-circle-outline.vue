<template>
  <Icon :class="wrapCls">
    <svg width="1em"
         height="1em"
         viewBox="0 0 16 16">
      <defs>
        <linearGradient x1="99.8224432%"
                        y1="50%"
                        x2="0%"
                        y2="50%"
                        :id="linearId">
          <stop v-if="twoToneColors"
                :stop-color="twoToneColors"
                offset="0%"></stop>
          <stop stop-color="currentColor"
                offset="100%"></stop>
        </linearGradient>
      </defs>
      <g stroke="none"
         stroke-width="1"
         fill="none"
         fill-rule="evenodd">
        <path d="M8,1 C11.8659932,1 15,4.13400675 15,8 C15,11.8659932 11.8659932,15 8,15 C4.13400675,15 1,11.8659932 1,8 C1,4.13400675 4.13400675,1 8,1 Z M11.3966859,5.34348515 L7.23505088,9.6772 L4.58583919,7.19288264 L3.94749414,7.87378403 L7.27060372,10.9891993 L12.0699807,5.98984819 L11.3966859,5.34348515 Z"
              :fill="`url(#${linearId})`"></path>
      </g>
    </svg>
  </Icon>
</template>

<script>
import Icon from './icon'

const prefixCls = 'r--icon-check-circle'

export default {
  name: 'CheckCircle',
  props: {
    twoToneColor: String
  },
  components: { Icon },
  computed: {
    wrapCls () {
      return prefixCls
    },
    twoToneColors () {
      // 通过 Vue.prototype.checkCircleTwoToneColor = 'red' 进行全局设置
      return this.twoToneColor || this.checkCircleTwoToneColor
    },
    linearId () {
      return 'linearGradient-' + new Date().getMilliseconds()
    }
  }
}
</script>


