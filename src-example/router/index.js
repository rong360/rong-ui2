import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/index'
import Titlebar from '../views/titlebar'
import Swiper from '../views/swiper'
import Button from '../views/button'
import Flexfixed from '../views/flexfixed'
import TextScroll from '../views/textscroll'
import Steps from '../views/steps'
import Form from '../views/form'
import FormDynamicRegistration from '../views/form/index_dynamic_registration'
import FormCss from '../views/form/index_css'
import Range from '../views/range'
import Input from '../views/input'
import Select from '../views/select'
import SelectDate from '../views/selectdate'
import DatePicker from '../views/datepicker'
import Switch from '../views/switch'
import Checkbox from '../views/checkbox'
import Radio from '../views/radio'
import Dialog from '../views/dialog'
import Toast from '../views/toast'
import Loading from '../views/loading'
import ActionSheet from '../views/action-sheet'

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
      path: '/textscroll',
      component: TextScroll
    },
    {
      path: '/steps',
      component: Steps
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
      path: '/selectdate',
      component: SelectDate
    },
    {
      path: '/datepicker',
      component: DatePicker
    },
    {
      path: '/switch',
      component: Switch
    },
    {
      path: '/checkbox',
      component: Checkbox
    },
    {
      path: '/radio',
      component: Radio
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
    },
    {
      path: '/action-sheet',
      component: ActionSheet
    }
  ]
})
