<template>
  <div class="r-demo dialog">
    <r-titlebar theme="b"
              @on-back="onBack">Dialog</r-titlebar>
    <div class="p-20">
      <nav-item class="item"
                @on-click="showDialog1">常规</nav-item>
      <nav-item class="item"
                @on-click="showDialog2">所有配置项</nav-item>
      <nav-item class="item"
                @on-click="showDialog3">配置title</nav-item>
      <nav-item class="item"
                @on-click="showDialog4">配置右上角关闭按钮</nav-item>
      <nav-item class="item"
                @on-click="showDialog5">自定义内容(Render函数)</nav-item>
      <nav-item class="item"
                @on-click="showDialog6">配置btn</nav-item>
      <nav-item class="item"
                @on-click="showDialog7">宽度+位置变化</nav-item>
      <nav-item class="item"
                @on-click="showDialog8">this.$dialog.tip</nav-item>
      <nav-item class="item"
                @on-click="showDialog9">this.$dialog.confirm</nav-item>
      <nav-item class="item"
                @on-click="showDialog10">this.$dialog.select</nav-item>
      <nav-item class="item"
                @on-click="showDialog11">模板方式插入Dialog
        <r-dialog v-model="showDlg11"
                @on-cancel="onCancelDialog11"
                @on-mask="onMaskDialog11">
          <nav-item style="text-align: center; padding: 50px 0">hello</nav-item>
        </r-dialog>
      </nav-item>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showDlg11: false
    }
  },
  methods: {
    // 常规
    showDialog1 () {
      const self = this;
      this.$dialog({
        propsData: {
          message: '生如夏花之绚烂，死如秋叶之静美<br>泰戈尔《生如夏花》',
          className: 'my-dialog'
        },
        methods: {
          onCancel () {
            this.remove();
          },
          onConfirm () {
            self.$toast('这是点击确认按钮的自定义回调');
            this.remove();
          }
        }
      });
    },
    // 所有配置项
    showDialog2 () {
      const self = this;
      this.$dialog({
        propsData: {
          // 标题
          showTitle: true,
          title: '标题',
          titleStyleObj: { color: 'green' },
          // 右上角关闭按钮
          showCloseBtn: true,
          // Icon
          showIcon: true,
          icon: 'beiju',
          // 内容(普通文本或简单html)
          message: '泰戈尔',
          contentStyleObj: { fontSize: '30px' },
          // 取消按钮
          cancelBtnText: "取消",
          showCancelBtn: true,
          cancelBtnStyleObj: { color: 'white', background: '#4080e8' },
          // 确认按钮
          confirmBtnText: "确认",
          showConfirmBtn: true,
          confirmBtnStyleObj: { color: 'white', background: '#4080e8' },
          // 遮罩层
          CliperStyleObj: { background: 'rgba(14, 14, 14, 0.5)' },
          // dialog框
          dlgStyleObj: { background: '#fff', width: '15rem' },
          // 动画
          animate: true,
          // 显示位置
          position: { x: 'center', y: 'center' }
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            self.$toast('这是点击确认按钮的自定义回调');
            this.remove();
          },
          // 右上角关闭按钮
          onClose: function () {
            self.$toast('这是点击关闭按钮的自定义回调');
            this.remove();
          },
          // 遮罩层
          onMask: function () {
            this.remove()
          },
          // dialog 内容区域
          onDlg () {
            this.resetPos()
          }
        }
      });
    },
    // 配置title
    showDialog3 () {
      this.$dialog({
        propsData: {
          // 标题
          showTitle: true,
          title: '飞鸟集',
          message: "当你为错过太阳而哭泣的时候，你也要再错过群星了。",
          titleStyleObj: { color: 'green' }
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            this.remove();
          }
        }
      });
    },
    // 配置右上角关闭按钮
    showDialog4 () {
      this.$dialog({
        propsData: {
          // 右上角关闭按钮
          showCloseBtn: true,
          // 内容(普通文本或简单html)
          message: '<div style="padding: 30px 0">我们把世界看错，反说它欺骗了我们。</div>'
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            this.remove();
          },
          // 右上角关闭按钮
          onClose: function () {
            this.remove();
          }
        }
      });
    },
    // 自定义内容
    showDialog5 () {
      let self = this
      let RepaymentTip = resolve => resolve(require("./repaymentTip.vue"))
      this.$dialog({
        propsData: {
          className: 'custom-tip',
          // 内容(文本或自定义组件)
          message: (h) => h(RepaymentTip, { props: { name: 'zyx' } })
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            self.$toast('这是点击确认按钮的自定义回调');
            this.remove();
          }
        }
      });
    },
    // 配置btn
    showDialog6 () {
      let self = this
      this.$dialog({
        propsData: {
          // 内容(普通文本或简单html)
          message: '眼睛为她下着雨，心却为她打着伞，这就是爱情',
          contentStyleObj: { fontSize: '24px', color: "#4080e8" },
          // 取消按钮
          cancelBtnText: "取消",
          showCancelBtn: true,
          cancelBtnStyleObj: { color: 'white', background: '#4080e8' },
          // 确认按钮
          confirmBtnText: "已阅",
          showConfirmBtn: true,
          confirmBtnStyleObj: { color: 'white', background: '#4080e8' }
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            self.$toast('这是点击确认按钮的自定义回调');
            this.remove();
          }
        }
      });
    },
    // 配置宽度+位置变化
    showDialog7 () {
      this.$dialog({
        propsData: {
          // 内容(普通文本或简单html)
          message: 'Eyes are raining for her,heart is holding umbrella for her,this is love.',
          // dialog框
          dlgStyleObj: { width: '100%', borderRadius: 0 },
          // 显示位置
          position: { x: 'center', y: 'bottom' }
        },
        methods: {
          // 取消按钮
          onCancel: function () {
            this.remove();
          },
          // 确认按钮
          onConfirm: function () {
            this.remove();
          }
        }
      });
    },
    // dialog拓展 - tip
    showDialog8 () {
      this.$dialog.tip({ message: 'hello', confirmBtnText: 'Ok', onConfirm: function () { this.remove() } })
    },
    // dialog拓展 - confirm
    showDialog9 () {
      this.$dialog.confirm({ message: 'hello', confirmBtnText: 'confirm', cancelBtnText: 'cancel', onConfirm: function () { }, onCancel: function () { this.remove() } })
    },
    // dialog拓展 - select
    showDialog10 () {
      this.$dialog.select({ menus: [{ title: '操作1' }, { title: '操作2' }], cancelBtnText: '取消', onCancel: function () { this.remove() }, onSelect: function (obj) { console.log(obj); this.remove() }, onMask: function () { this.remove() } })
    },
    showDialog11 () {
      this.showDlg11 = this.true
    },
    onCancelDialog11 (e, dialog) {
      // this.showDlg11 = false
      dialog.remove()
    },
    onMaskDialog11 (e, dialog) {
      dialog.remove()
    },
    onBack () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less">
</style>
