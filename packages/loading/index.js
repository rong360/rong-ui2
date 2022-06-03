import Vue from "vue"
import Loading from './loading'
import { getComponentContext } from '../_utils'

let globalConfig = {
  loading: null
}

let LoadingConstructor = Vue.extend(Loading);

let loadingCst = function (options = {}) {
  if (!options.propsData) options.propsData = {}
  options.propsData = Object.assign({}, globalConfig, options.propsData)

  options.propsData.loading = getComponentContext(options.propsData.loading)

  let instance = new LoadingConstructor(options);

  document.body.appendChild(instance.$mount().$el);

  return instance;
}

const install = function (Vue) {
  Vue.prototype.$loading = loadingCst;
}

Loading.install = install
Loading.create = loadingCst

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

Loading.config = function ({ loading, style }) {
  globalConfig.loading = loading
}

export default Loading
