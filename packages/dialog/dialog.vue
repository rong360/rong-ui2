<template>
  <transition appear
              :name="bem('fade')"
              @enter="enter"
              @after-leave="afterLeave">
    <div :class="[bem(), className]"
         :style="CliperStyleObj"
         @click.self="onMask"
         v-show="showDlg"
         v-preventscroll>
      <div :class="bem('inner')"
           :style="dlgStyleObj"
           @click="onDlg"
           ref="dlgContent">
        <div :class="bem('title')"
             :style="titleStyleObj"
             v-if="title">{{title}}</div>
        <div :class="bem('close')"
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
          <div :class="bem('content')"
               :style="contentStyleObj"
               v-if="(typeof message != 'function' && message)"
               v-html="message"></div>
          <rContent :rContentData="rContentData"
                    ref="rContent"></rContent>
        </slot>
        <div :class="bem('btn')"
             v-if="showCancelBtn || showConfirmBtn">
          <div :class="bem('cancel-btn', {'right-border': showCancelBtn&&showConfirmBtn })"
               :style="cancelBtnStyleObj"
               @click="onCancel"
               v-if="showCancelBtn"
               v-html="cancelBtnText"></div>
          <div :class="bem('confirm-btn')"
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
import { createNamespace } from '../_utils'
import preventscroll from '../_directives/preventscroll'
import Render from '../base/render'
const { name, bem } = createNamespace('dialog')

export default {
  name,
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
    // 内容 v1.1.2版本支持function
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
    },
    // 自定义class v1.1.3
    className: String
  },
  data () {
    return {
      bem,
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
    this.removeDialogOnHashChange && this.$data.fromDlgCst && window.addEventListener('pushstate', this.remove)
    this.removeDialogOnHashChange && this.$data.fromDlgCst && window.addEventListener('replacestate', this.remove)
    this.removeDialogOnHashChange && this.$data.fromDlgCst && window.addEventListener('popstate', this.remove)
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
      this.removeDialogOnHashChange && this.$data.fromDlgCst && window.removeEventListener('pushstate', this.remove)
      this.removeDialogOnHashChange && this.$data.fromDlgCst && window.removeEventListener('replacestate', this.remove)
      this.removeDialogOnHashChange && this.$data.fromDlgCst && window.removeEventListener('popstate', this.remove)
    },
    beforeDestroy () {
      this._remove()
    },
    resetPos () {
      if (!this.$refs.dlgContent) return

      let dialogWidth = this.$refs.dlgContent.offsetWidth
      let dialogHeight = this.$refs.dlgContent.offsetHeight
      let screenWidth =
        window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth
      let screenHeight =
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
