import _Swiper from './swiper'
import _SwiperItem from './swiper-item'
import { withInstall } from '../_utils'

const Swiper = withInstall(_Swiper, ({ Vue }) => {
  const SwiperItem = withInstall(_SwiperItem)
  Vue.use(SwiperItem)
})

export default Swiper
