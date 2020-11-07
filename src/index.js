import Form from './components/form/'
import Input from './components/input/'
import Select from './components/select/'
import Titlebar from './components/titlebar/'
import Banner from './components/banner/'
import Button from './components/button/'
import Range from './components/range/'
import FlexFixed from './components/flex-fixed/'
import Loading from './components/loading/'
import Toast from './components/toast/'
import Dialog from './components/dialog/'

const components = {
  Form,
  Input,
  Select,
  Titlebar,
  Banner,
  Button,
  Range,
  FlexFixed,
  Loading,
  Toast,
  Dialog
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.use(components[key])
  });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

const API = {
  install,
  ...components
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
