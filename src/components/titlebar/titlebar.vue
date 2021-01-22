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
const prefixCls = 'r--titlebar'

export default {
  name: 'Titlebar',
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

<style lang="less">
@titlebarCls: r--titlebar;

.@{titlebarCls} {
  height: 45px;
  line-height: 45px;
  text-align: center;
  position: relative;
  box-sizing: border-box;
  .l-operate,
  .r-operate {
    position: absolute;
    top: 0;
    bottom: 0;
    font-size: 15px;
  }
  .l-operate {
    left: 0;
  }
  .r-operate {
    right: 0;
  }
  .c-operate {
    font-size: 17px;
  }
  .back {
    box-sizing: border-box;
    line-height: 1;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 15px;
  }
  &-theme-a {
    color: #333;
  }
  &-theme-b {
    color: #fff;
    background-image: linear-gradient(90deg, #39b9ff 0%, #4080e8 100%);
  }
  &-theme-c {
    color: #fff;
    background-image: linear-gradient(-90deg, #4d78f6 2%, #919fff 100%);
  }
  &-theme-d {
    color: #fff;
    background-image: linear-gradient(-269deg, #15ddc5 1%, #01a6d0 99%);
  }
  &-theme-e {
    color: #fff;
    background-image: linear-gradient(-90deg, #f86b4a 0%, #fec351 100%);
  }
  &-theme-f {
    color: #fff;
    background-image: linear-gradient(-90deg, #ff3061 0%, #fe8166 100%);
  }
}
</style>
