import Vue from 'vue'
import router from './router/doc'
import App from './doc.vue'
import Highlight from './directives/highlight';
import './assets/css/docs.less'
import './assets/css/markdown-light.css'

Vue.use(Highlight)

// 开启debug模式#3152F2
Vue.config.debug = true;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
