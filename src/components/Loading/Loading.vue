<template>
  <div class="r--Loading">
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
export default {
  name: "Loading",
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
<style lang='less'>
@loadingCls: r--Loading;

/*loading*/
@-webkit-keyframes r-loadingRun{
    0%{ -webkit-transform:scale(1);}
    50%{ -webkit-transform:scale(0);}
    100%{ -webkit-transform:scale(1);}
}
@keyframes r-loadingRun{
    0%{ transform:scale(1);}
    50%{ transform:scale(0);}
    100%{ transform:scale(1);}
}
.@{loadingCls}{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1888;
    background-color: rgba(0,0,0,0.5);
    .r-content{
        position: absolute;
        left: 50%;
        top: 40%;
        z-index: 1889;
    }
    .r-content1,.r-content2{
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .r-content1 div,.r-content2 div{
        position: absolute;
        border-radius: 50%;
        background-color: #4080e8;
        -webkit-animation: 1.5s infinite r-loadingRun;
        animation: 1.5s infinite r-loadingRun;
    }
    .r-content2{
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
    }
    .r-arc1{ left:0; top:0;}
    .r-arc2{ right:0; top:0;}
    .r-arc3{ right:0; bottom:0;}
    .r-arc4{ left:0; bottom:0;}
    .r-content1{
        .r-arc1{ animation-delay:-1.5s;}
    }
    .r-content2{
        .r-arc1{ animation-delay:-1.3s;}
    }
    .r-content1{
        .r-arc2{ animation-delay:-1.1s;}
    }
    .r-content2{
        .r-arc2{ animation-delay:-0.9s;}
    }
    .r-content1{
        .r-arc3{ animation-delay:-0.7s;}
    }
    .r-content2{
        .r-arc3{ animation-delay:-0.5s;}
    }
    .r-content1{
        .r-arc4{ animation-delay:-0,3s;}
    }
    .r-content2{
        .r-arc4{ animation-delay:-0.1s;}
    }
    .r-content3{
        position: absolute;
        width: 100%;
        top: 50%;
        left: 0;
        text-align: center;
        &.inside{
            top: 42%;
        }
    }
}
</style>
