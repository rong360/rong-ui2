import Form from './components/form/'
import Input from './components/input/'
import Select from './components/select/'
import Switch from './components/switch/'
import Checkbox from './components/checkbox/'
import Titlebar from './components/titlebar/'
import Swiper from './components/swiper/'
import Button from './components/button/'
import Range from './components/range/'
import FlexFixed from './components/flex-fixed/'
import TextScroll from './components/text-scroll/'
import Steps from './components/steps/'
import Loading from './components/loading/'
import Toast from './components/toast/'
import Dialog from './components/dialog/'

const components = {
  Form,
  Input,
  Select,
  Switch,
  Titlebar,
  Swiper,
  Checkbox,
  Button,
  Range,
  FlexFixed,
  TextScroll,
  Steps,
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
