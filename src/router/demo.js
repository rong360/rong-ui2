import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/demo/Home.vue'
import { nav } from '../config.json'

Vue.use(VueRouter)

let routes = []

routes.push({
  path: '/home',
  name: 'Home',
  component: Home
})

nav.forEach(group => {
  group.children.forEach(({ name, type }) => {
    routes.push({
      path: `/${name.toLowerCase()}`,
      name,
      component: {
        render: h => {
          let readme = {}
          let componentFolder = name.replace(/([a-z])([A-Z])/g, '$1' + '-' + '$2').toLowerCase() // FlexFixed -> flex-fixed
          if (type === 'component') {
            try {
              readme = require(`../../packages/${componentFolder}/__demo__/index.vue`)
            } catch (err) {
              readme = {
                default: {
                  template: `<div class="error-page">${err.message} <strong>in '/packages/'}</strong></div>`
                }
              }
            }
          } else {
            try {
              readme = require(`../../src/views/docs/${componentFolder}/__demo__/index.vue`)
            } catch (err) {
              readme = {
                default: {
                  template: `<div class="error-page">${err.message} <strong>in '/src/views/docs/'}</strong></div>`
                }
              }
            }
          }
          return h(readme.default)
        }
      }
    })
  })
});

routes.push({
  path: "*",
  redirect: function (to) {
    return { path: "/home" }
  }
})

export default new VueRouter({
  routes
})
