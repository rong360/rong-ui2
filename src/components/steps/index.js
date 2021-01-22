import Steps from './steps'
import Step from './step'

Steps.install = function (Vue) {
  Vue.component(Steps.name, Steps);
  Vue.component(Step.name, Step);
}

export default Steps
