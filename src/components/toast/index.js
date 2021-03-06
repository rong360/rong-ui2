import Vue from "vue"
import Toast from './toast'

let ToastConstructor = Vue.extend(Toast);

let toastCst = function (options) {
  if (typeof options === 'string') {
    options = {
      propsData: {
        message: options
      }
    }
  }

  let instance = new ToastConstructor(options);

  document.body.appendChild(instance.$mount().$el);

  return instance;
}

Toast.install = function (Vue) {
  Vue.prototype.$toast = toastCst;
  Vue.prototype.$toast.long = (content) => {
    return toastCst({
      propsData: {
        type: 'long',
        message: content
      }
    })
  }
  Vue.prototype.$toast.positive = (content) => {
    return toastCst({
      propsData: {
        type: 'positive',
        message: content
      }
    })
  }
  Vue.prototype.$toast.negetive = (content) => {
    return toastCst({
      propsData: {
        type: 'negetive',
        message: content
      }
    })
  }
}

export default Toast
