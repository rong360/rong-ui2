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

function install (Vue) {
  const components = [
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
  ];
  components.forEach(item => {
    if (item.install) {
      Vue.use(item)
    } else if (item.name) {
      Vue.component(item.name, item)
    }
  })
}

export { default as Form } from './form/'
export { default as Input } from './input/'
export { default as Select } from './select/'
export { default as SelectDate } from './select-date/'
export { default as Select2 } from './select2/'
export { default as Select3 } from './select3/'
export { default as DatePicker } from './date-picker/'
export { default as Switch } from './switch/'
export { default as Checkbox } from './checkbox/'
export { default as Radio } from './radio/'
export { default as Uploader } from './uploader/'
export { default as Titlebar } from './titlebar/'
export { default as Swiper } from './swiper/'
export { default as Button } from './button/'
export { default as Range } from './range/'
export { default as FlexFixed } from './flex-fixed/'
export { default as TextScroll } from './text-scroll/'
export { default as Steps } from './steps/'
export { default as Loading } from './loading/'
export { default as Toast } from './toast/'
export { default as Dialog } from './dialog/'
export { default as ActionSheet } from './action-sheet/'

export default {
  install
}
