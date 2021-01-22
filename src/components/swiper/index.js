import Swiper from './swiper'
import SwiperItem from './swiper-item'

Swiper.install = function (Vue) {
  Vue.component(Swiper.name, Swiper);
  Vue.component(SwiperItem.name, SwiperItem);
}

export default Swiper
