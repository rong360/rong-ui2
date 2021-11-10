// import 'babel-polyfill';
import Vue from 'vue'
import router from './router'
import App from './app'
import rongUI2 from '../src'
import { fetch } from './utils/fetch'
import ViewSource from './components/ViewSource'
import './assets/css/common.less'
// import {Loading, Input, Titlebar} from 'rong-ui2'
// Loading.config({
//   loading: require('./components/LoadingCircle.vue')
// })
// Vue.use(Loading)
// Vue.use(Input)
// Vue.use(Titlebar)

// import 'rong-ui2/dist/styles/rong-ui.css'
// import rongUI2, {Loading} from 'rong-ui2'
// Loading.config({
//   loading: require('./components/LoadingCattle.vue')
// })
// Vue.use(rongUI2)

Vue.use(rongUI2)

Vue.component('ViewSource', ViewSource)

// 开启debug模式#3152F2
Vue.config.debug = true;
// Vue.prototype.checkCircleTwoToneColor = '#3152F2'
Vue.prototype.$fetch = fetch;
window._app = new Vue();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
