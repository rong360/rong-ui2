import Vue from 'vue'
import router from './router/demo'
import App from './demo.vue'
import * as RongUi2 from '../packages'
import NavItem from './components/NavItem.vue'
import './assets/css/demo.less'

Vue.use(RongUi2.default)
Vue.component('NavItem', NavItem)
for (let key in RongUi2) {
  let component = RongUi2[key]
  if (component.__file) {
    let componentDir = component.__file.match(/packages\/(\S+)\//)[1]
    try {
      require(`../packages/${componentDir}/style/index.less`)
    } catch (err) { }
  }
}

// 开启debug模式#3152F2
Vue.config.debug = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
