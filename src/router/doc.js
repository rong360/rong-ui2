import Vue from 'vue'
import VueRouter from 'vue-router'
import { nav } from '../config.json'

Vue.use(VueRouter)

let routes = []

nav.forEach(group => {
  group.children.forEach(({ name, type, desc }) => {
    routes.push({
      path: `/${name.toLowerCase()}`,
      name,
      component: {
        render: h => {
          let readme = {}
          let componentFolder = name.replace(/([a-z])([A-Z])/g, '$1' + '-' + '$2').toLowerCase() // FlexFixed -> flex-fixed
          try {
            if (type === 'component') {
              readme = require(`../../packages/${componentFolder}/README.md`)
            } else {
              readme = require(`../../src/views/docs/${componentFolder}/README.md`)
            }
          } catch (err) {
            readme = { default: `<div class="error-page">${err.message} <strong>in ${type === 'component' ? '/packages/' : '/src/views/docs/'}</div></strong>` }
          }
          return h('div', { class: { 'markdown-body': true }, domProps: { innerHTML: readme.default } })
        }
      }
    })
  })
});

routes.push({
  path: "*",
  redirect: function (to) {
    return { path: "/introduce" }
  }
})

export default new VueRouter({
  routes
})
