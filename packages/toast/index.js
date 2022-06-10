import Vue from "vue"
import Toast from './toast'
import { getComponentContext } from '../_utils'

let globalConfig = {
  time: null
}

let ToastConstructor = Vue.extend(Toast);

let toastCst = function (options = {}) {
  if (typeof options === 'string') {
    options = {
      propsData: {
        message: options
      }
    }
  }

  options.propsData = Object.assign({}, globalConfig, options.propsData)

  options.propsData.icon = getComponentContext(options.propsData.icon)

  let instance = new ToastConstructor(options);

  document.body.appendChild(instance.$mount().$el);

  return instance;
}

const install = function (Vue) {
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

Toast.install = install
Toast.create = toastCst

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

Toast.config = function ({ time }) {
  globalConfig.time = time
}

export default Toast
