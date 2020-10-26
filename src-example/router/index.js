import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: (resolve) => require(['../views/index'], resolve)
    },
    {
      path: '/titlebar',
      component: (resolve) => require(['../views/titlebar'], resolve)
    },
    {
      path: '/button',
      component: (resolve) => require(['../views/button'], resolve)
    },
    {
      path: '/flexfixed',
      component: (resolve) => require(['../views/flexfixed'], resolve)
    },
    {
      path: '/form',
      component: (resolve) => require(['../views/form'], resolve)
    },
    {
      path: '/range',
      component: (resolve) => require(['../views/range'], resolve)
    },
    {
      path: '/input',
      component: (resolve) => require(['../views/input'], resolve)
    },
    {
      path: '/select',
      component: (resolve) => require(['../views/select'], resolve)
    },
    {
      path: '/form/css',
      component: (resolve) => require(['../views/form/index_css'], resolve)
    },
    {
      path: '/dialog',
      component: (resolve) => require(['../views/dialog'], resolve)
    },
    {
      path: '/toast',
      component: (resolve) => require(['../views/toast'], resolve)
    }
  ]
})
