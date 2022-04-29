import Form from './form/'
import Input from './input/'
import Select from './select/'
import SelectDate from './select-date/'
import Select2 from './select2/'
import Select3 from './select3/'
import DatePicker from './date-picker/'
import Switch from './switch/'
import Checkbox from './checkbox/'
import Radio from './radio/'
import Uploader from './uploader/'
import Titlebar from './titlebar/'
import Swiper from './swiper/'
import Button from './button/'
import Range from './range/'
import FlexFixed from './flex-fixed/'
import TextScroll from './text-scroll/'
import Steps from './steps/'
import Loading from './loading/'
import Toast from './toast/'
import Dialog from './dialog/'
import ActionSheet from './action-sheet/'

const components = {
  Form,
  Input,
  Select,
  SelectDate,
  Select2,
  Select3,
  DatePicker,
  Switch,
  Titlebar,
  Swiper,
  Checkbox,
  Radio,
  Uploader,
  Button,
  Range,
  FlexFixed,
  TextScroll,
  Steps,
  Loading,
  Toast,
  Dialog,
  ActionSheet
};

const install = function (Vue, opts = {}) {
  if (install.installed) return;
  Object.keys(components).forEach(key => {
    Vue.use(components[key])
  });
};

// auto install
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// }

const API = {
  install,
  ...components
};

export default API
// module.exports.default = module.exports = API; // eslint-disable-line no-undef
