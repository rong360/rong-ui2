import _Steps from './steps'
import _Step from './step'
import { withInstall } from '../_utils'

const Steps = withInstall(_Steps, ({ Vue }) => {
  const Step = withInstall(_Step)
  Vue.use(Step)
})

export default Steps
