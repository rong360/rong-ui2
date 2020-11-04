import Vue from 'vue'
import Dialog from './dialog.vue'

let DialogConstructor = Vue.extend(Dialog);

let dlgCst = function (options) {
  let instance = new DialogConstructor(options);
  instance.$data.fromDlgCst = true
  document.body.appendChild(instance.$mount().$el);

  return instance;
}

let tip = function (options) {
  if (typeof options == 'string') options = { message: options }
  let propsData = {
    showCancelBtn: false
  }
  Object.assign(propsData, options)
  return dlgCst({
    propsData,
    methods: {
      onConfirm () {
        let onConfirm = options && options.onConfirm && options.onConfirm
        onConfirm ? onConfirm.call(this) : this.remove()
      }
    }
  })
}

let confirm = function (options) {
  if (typeof options == 'string') options = { message: options }
  let propsData = {}
  Object.assign(propsData, options)
  return dlgCst({
    propsData,
    methods: {
      onConfirm () {
        let onConfirm = options && options.onConfirm && options.onConfirm
        onConfirm ? onConfirm.call(this) : this.remove()
      },
      onCancel () {
        let onCancel = options && options.onCancel && options.onCancel
        onCancel ? onCancel.call(this) : this.remove()
      }
    }
  })
}

let select = function (options = {}) {
  let propsData = {
    dlgStyleObj: { width: '100%', borderRadius: 0 },
    position: { x: 'center', y: 'bottom' },
    showConfirmBtn: false,
    rContentData: {
      menus: options.menus || [],
      onSelect: options.onSelect
    }
  }
  Object.assign(propsData, options)
  return dlgCst({
    propsData,
    components: {
      rContent: resolve => resolve(require('./select'))
    },
    methods: {
      onConfirm () {
        let onConfirm = options && options.onConfirm && options.onConfirm
        onConfirm ? onConfirm.call(this) : this.remove()
      },
      onCancel () {
        let onCancel = options && options.onCancel && options.onCancel
        onCancel ? onCancel.call(this) : this.remove()
      }
    }
  })
}

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
  Vue.prototype.$dialog = dlgCst;
  // dialog拓展
  Vue.prototype.$dialog.tip = tip
  Vue.prototype.$dialog.confirm = confirm
  Vue.prototype.$dialog.select = select
}

export default Dialog;

