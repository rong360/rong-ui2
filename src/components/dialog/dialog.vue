<template>
  <transition appear
              :name="transitionName"
              @enter="enter"
              @after-leave="afterLeave">
    <div :class="wrapCls"
         :style="CliperStyleObj"
         @click.self="onMask"
         v-show="showDlg"
         v-preventscroll>
      <div :class="innerCls"
           :style="dlgStyleObj"
           @click="onDlg"
           ref="dlgContent">
        <div :class="titleCls"
             :style="titleStyleObj"
             v-if="title">{{title}}</div>
        <div :class="closeCls"
             :style="closeStyleObj"
             @click="onClose"
             v-if="showCloseBtn"><svg width="11px"
               height="11px"
               viewBox="0 0 11 11"
               version="1.1"
               xmlns="http://www.w3.org/2000/svg"
               xmlns:xlink="http://www.w3.org/1999/xlink">
            <g stroke="none"
               stroke-width="1"
               fill="none"
               fill-rule="evenodd">
              <g transform="translate(-249.000000, -10.000000)"
                 fill="#999999">
                <path d="M254.50013,14.8683272 L249.762514,10.1306735 C249.588122,9.95644215 249.305423,9.95644215 249.130794,10.1306735 C248.956402,10.3052215 248.956402,10.5880359 249.130794,10.7624255 L253.868428,15.500023 L249.130795,20.2376113 C248.956402,20.4120016 248.956402,20.6948302 249.130795,20.8692073 C249.305425,21.0435976 249.588125,21.0435976 249.76228,20.8692073 L254.499971,16.1315614 L259.237665,20.8692176 C259.411819,21.0435941 259.694768,21.0435941 259.869384,20.8692176 C260.043539,20.694828 260.043539,20.4120004 259.869384,20.2376239 L255.131668,15.4998705 L259.869205,10.7623788 C260.043598,10.5880017 260.043598,10.3053314 259.869205,10.1307828 C259.694588,9.95640572 259.411875,9.95640572 259.23772,10.1307828 L254.50013,14.8683272 Z"></path>
              </g>
            </g>
          </svg></div>
        <slot>
          <Render v-if="typeof message == 'function'"
                  :render="message">fsdf</Render>
          <div :class="contentCls"
               :style="contentStyleObj"
               v-if="typeof message != 'function' && message"
               v-html="message"></div>
          <rContent :rContentData="rContentData"
                    ref="rContent"></rContent>
        </slot>
        <div :class="btnCls"
             v-if="showCancelBtn || showConfirmBtn">
          <div :class="cancelBtnCls"
               :style="cancelBtnStyleObj"
               @click="onCancel"
               v-if="showCancelBtn"
               v-html="cancelBtnText"></div>
          <div :class="confirmBtnCls"
               :style="confirmBtnStyleObj"
               @click="onConfirm"
               v-if="showConfirmBtn"
               v-html="confirmBtnText"></div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
import preventscroll from '../../directives/preventscroll'
import Render from '../base/render'
const prefixCls = 'r--dialog'

export default {
  name: 'Dialog',
  props: {
    // template模板方式插入dialog时，控制dialog是否显示
    value: {
      type: Boolean,
      default: true
    },
    // 标题
    title: String,
    showTitle: {
      type: Boolean,
      default: false
    },
    titleStyleObj: Object,
    // closeBtn
    showCloseBtn: {
      type: Boolean,
      default: false
    },
    closeStyleObj: Object,
    // 内容
    message: [String, Function],
    contentStyleObj: Object,
    rContentData: Object,
    // cancelBtn
    cancelBtnText: {
      type: String,
      default: '取消'
    },
    showCancelBtn: {
      type: Boolean,
      default: true
    },
    cancelBtnStyleObj: Object,
    // confirmBtn
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    showConfirmBtn: {
      type: Boolean,
      default: true
    },
    confirmBtnStyleObj: Object,
    // dialog框
    dlgStyleObj: Object,
    // 遮罩
    CliperStyleObj: Object,
    // 显示位置
    position: {
      type: Object,
      default: function () {
        return {
          x: 'center',
          y: 'center'
        }
      }
    },
    // hash变化时移除dialog
    removeDialogOnHashChange: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      mouseInfo: {
        startX: 0,
        startY: 0,
        direction: ''
      },
      showDlg: this.value
    }
  },
  watch: {
    value: function (newVal, oldVal) {
      this.showDlg = newVal
    }
  },
  computed: {
    wrapCls () {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-cancel-btn-show`]: this.showCancelBtn,
          [`${prefixCls}-confirm-btn-show`]: this.showConfirmBtn
        }
      ]
    },
    innerCls () {
      return `${prefixCls}-inner`
    },
    titleCls () {
      return `${prefixCls}-title`
    },
    closeCls () {
      return `${prefixCls}-close`
    },
    contentCls () {
      return `${prefixCls}-content`
    },
    btnCls () {
      return `${prefixCls}-btn`
    },
    cancelBtnCls () {
      return `${prefixCls}-cancel-btn`
    },
    confirmBtnCls () {
      return `${prefixCls}-confirm-btn`
    },
    transitionName () {
      return `${prefixCls}-fade`
    }
  },
  directives: {
    preventscroll
  },
  components: {
    rContent: {
      template: '<div></div>'
    },
    Render
  },
  mounted () {
    this.$nextTick(function () {
      this.resetPos()
    })
    this.removeDialogOnHashChange && this.$data.fromDlgCst && window.addEventListener('hashchange', this.remove)
  },
  methods: {
    onCancel (e) {
      !this.$data.fromDlgCst && this.$emit('on-cancel', e, this)
    },
    onConfirm (e) {
      !this.$data.fromDlgCst && this.$emit('on-confirm', e, this)
    },
    onClose (e) {
      !this.$data.fromDlgCst && this.$emit('on-close', e, this)
    },
    onMask (e) {
      !this.$data.fromDlgCst && this.$emit('on-mask', e, this)
    },
    onDlg (e) {
      // this.resetPos()
      !this.$data.fromDlgCst && this.$emit('on-dlg', e, this)
    },
    enter () {
      this.resetPos()
    },
    afterLeave () {
      if (this.$data.fromDlgCst) {
        this._remove()
      } else {
        this.$emit('input', false)
      }
    },
    remove () {
      this.showDlg = false
    },
    _remove () {
      this.$el.remove();
      this.$destroy();
      this.removeDialogOnHashChange && this.$data.fromDlgCst && window.removeEventListener('hashchange', this.remove)
    },
    beforeDestroy () {
      this._remove()
    },
    resetPos () {
      if (!this.$refs.dlgContent) return

      var dialogWidth = this.$refs.dlgContent.offsetWidth
      var dialogHeight = this.$refs.dlgContent.offsetHeight
      var screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      var screenHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight

      if (dialogWidth > screenWidth) {
        this.$refs.dlgContent.style.width = screenWidth + 'px'
      } else {
        switch (this.position.x) {
          case 'center':
            this.$refs.dlgContent.style.marginLeft =
              (screenWidth - dialogWidth) / 2 + 'px'
            break
          case 'left':
            this.$refs.dlgContent.style.left = '0px'
            break
          case 'right':
            this.$refs.dlgContent.style.right = '0px'
            break
          default:
            this.$refs.dlgContent.style.left = this.position.x
        }
      }

      if (dialogHeight > screenHeight) {
        this.$refs.dlgContent.style.top = '0px'
        this.$refs.dlgContent.style.height = screenHeight + 'px'
      } else {
        switch (this.position.y) {
          case 'top':
            this.$refs.dlgContent.style.top = '0px'
            break
          case 'center':
            this.$refs.dlgContent.style.top =
              (screenHeight - dialogHeight) / 2 + 'px'
            break
          case 'bottom':
            this.$refs.dlgContent.style.bottom = '0px'
            break
          default:
            this.$refs.dlgContent.style.top = this.position.y
        }
      }
    }
  }
}
</script>

<style lang="less">
@dialogCls: r--dialog;

.@{dialogCls} {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(14, 14, 14, 0.8);
  z-index: 990;
  &-inner {
    position: fixed;
    width: 270px;
    font-size: 15px;
    line-height: 1;
    background-color: #fff;
    color: #333;
    box-sizing: border-box;
    z-index: 991;
    border-radius: 6px;
    overflow: hidden;
  }
  &-title {
    text-align: center;
    line-height: 48px;
  }
  &-title::after {
    display: block;
    content: "";
    height: 1px;
    overflow: hidden;
    background-color: #d8d9dc;
  }
  &-close {
    position: absolute;
    right: 0;
    top: 0;
    line-height: 1;
    padding: 15px;
  }
  &-content {
    padding: 15px;
    text-align: center;
    line-height: 24px;
  }
  &-btn {
    display: flex;
    line-height: 45px;
    border-top: 1px solid #e5e5e5;
  }
  &-cancel-btn,
  &-confirm-btn {
    flex: 1;
    text-align: center;
    box-sizing: border-box;
  }
  &-cancel-btn-show&-confirm-btn-show &-cancel-btn {
    border-right: 1px solid #e5e5e5;
  }
  &-fade-enter-active,
  &-fade-leave-active {
    transition: opacity 0.3s;
  }
  &-fade-enter,
  &-fade-leave-to {
    opacity: 0;
  }
}
</style>
