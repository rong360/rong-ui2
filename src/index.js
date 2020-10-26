import Form from './components/Form/'
import Input from './components/Input/'
import Select from './components/Select/'
import Titlebar from './components/Titlebar/'
import Button from './components/Button/'
import Range from './components/Range/'
import FlexFixed from './components/FlexFixed/'
import Loading from './components/Loading/'
import Toast from './components/Toast/'
import Dialog from './components/Dialog/'

const components = {
  Form,
  Input,
  Select,
  Titlebar,
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
  version: process.env.VERSION, // eslint-disable-line no-undef
  install,
  ...components
};

module.exports.default = module.exports = API;   // eslint-disable-line no-undef
