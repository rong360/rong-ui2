import Vue from "vue"
import Loading from './loading'

let LoadingConstructor = Vue.extend(Loading);

let loadingCst = function (options) {
  let instance = new LoadingConstructor(options);

  document.body.appendChild(instance.$mount().$el);

  return instance;
}

Loading.config = function ({ loading, style }) {
  let customLoading = null
  if (loading && loading.render) {
    customLoading = loading
  } else if (loading && loading.default && loading.default.render) {
    customLoading = loading.default
  }
  if (customLoading) {
    Vue.component(customLoading.name, customLoading)
    Vue.prototype.customLoading = customLoading
  }
}

Loading.install = function (Vue) {
  Vue.prototype.$loading = loadingCst;
}

export default Loading
