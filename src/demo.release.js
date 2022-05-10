import Vue from 'vue'
import router from './router/demo'
import App from './demo.vue'
import NavItem from './components/NavItem.vue'
import './assets/css/demo.less'

/**
 * 测试按需加载
 *  .babelrc 需配置 ["import", { "libraryName": "rong-ui2", "libraryDirectory": "es", "style": "css" }]
 */
import { Dialog, Loading, Toast, ActionSheet, Titlebar, Button, FlexFixed, Form, Input, Select, Select2, Select3, SelectDate, Checkbox, Radio, DatePicker, Switch, Uploader, TextScroll, Swiper, Steps, Range } from 'rong-ui2'
Vue.use(Dialog)
Vue.use(Loading)
Vue.use(Toast)
Vue.use(ActionSheet)
Vue.use(Titlebar)
Vue.use(Button)
Vue.use(FlexFixed)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Select2)
Vue.use(Select3)
Vue.use(SelectDate)
Vue.use(Checkbox)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Switch)
Vue.use(Uploader)
Vue.use(TextScroll)
Vue.use(Swiper)
Vue.use(Steps)
Vue.use(Range)

/**
 * 测试非按需加载
 *  注意.babelrc 中需删除 ["import", { "libraryName": "rong-ui2", "libraryDirectory": "es", "style": "css" }]
 */
// import RongUi2 from 'rong-ui2'
// import 'rong-ui2/lib/style.css'
// Vue.use(RongUi2)

Vue.component('NavItem', NavItem)

// 开启debug模式#3152F2
Vue.config.debug = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
