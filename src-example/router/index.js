import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index'
import Titlebar from '../views/titlebar'
import Swiper from '../views/swiper'
import Button from '../views/button'
import Flexfixed from '../views/flexfixed'
import Form from '../views/form'
import FormDynamicRegistration from '../views/form/index_dynamic_registration'
import FormCss from '../views/form/index_css'
import Range from '../views/range'
import Input from '../views/input'
import Select from '../views/select'
import Switch from '../views/switch'
import Dialog from '../views/dialog'
import Toast from '../views/toast'
import Loading from '../views/loading'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/titlebar',
      component: Titlebar
    },
    {
      path: '/swiper',
      component: Swiper
    },
    {
      path: '/button',
      component: Button
    },
    {
      path: '/flexfixed',
      component: Flexfixed
    },
    {
      path: '/range',
      component: Range
    },
    {
      path: '/input',
      component: Input
    },
    {
      path: '/select',
      component: Select
    },
    {
      path: '/switch',
      component: Switch
    },
    {
      path: '/form',
      component: Form
    },
    {
      path: '/form/dynamicregistration',
      component: FormDynamicRegistration
    },
    {
      path: '/form/css',
      component: FormCss
    },
    {
      path: '/dialog',
      component: Dialog
    },
    {
      path: '/toast',
      component: Toast
    },
    {
      path: '/loading',
      component: Loading
    }
  ]
})
