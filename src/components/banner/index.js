import Banner from './banner'
import BannerItem from './banner-item'

Banner.install = function (Vue) {
  Vue.component(Banner.name, Banner);
  Vue.component(BannerItem.name, BannerItem);
}

export default Banner
