import Vue from 'vue'
import Dialog from './dialog.vue'

let DialogConstructor = Vue.extend(Dialog);

var dlgCst = function (options) {
  let instance = new DialogConstructor(options);
  instance.$data.fromDlgCst = true
  document.body.appendChild(instance.$mount().$el);

  return instance;
}

Dialog.install = function (Vue) {
  Vue.component(Dialog.name, Dialog);
  Vue.prototype.$dialog = dlgCst;
}

export default Dialog;

