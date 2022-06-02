import Vue from 'vue'
import router from './router/demo'
import App from './demo.vue'
import RongUi2, { Loading, Toast, components } from '../packages'
import NavItem from './components/NavItem.vue'
import './assets/css/demo.less'
// import LoadingCattle from './components/LoadingCattle.vue'

Loading.config({
  // loading: require('./components/LoadingCattle.vue') // 项目中添加Loading组件
  // loading: h => h(LoadingCattle, { props: { color: 'red' } })
})

Toast.config({
  time: 2000
})

// Vue.prototype.checkCircleTwoToneColor = 'red'

Vue.use(RongUi2)
Vue.component('NavItem', NavItem)
for (let key in components) {
  let component = components[key]
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
