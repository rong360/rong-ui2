// import 'babel-polyfill';
import Vue from 'vue'
import router from './router'
import App from './app'
import rongui2 from '../src'
import { fetch } from './utils/fetch'

Vue.use(rongui2)

// 开启debug模式
Vue.config.debug = true;

Vue.prototype.$fetch = fetch;
window._app = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
