# Swiper 轮播图


<div class="r-doc-card">

### 介绍
用于循环播放一组图片或内容。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Swiper } from 'rong-ui2';

Vue.use(Swiper)
```
</div>



## 基本用法

<div class="r-doc-card">

```html
<r-swiper>
  <r-swiperitem @on-click="onClickSwiperItem"><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/123209/30/16604/143626/5f9bb747Ea155ae71/aadf80788d17d8e0.jpg!q70.jpg.dpg" /></r-swiperitem>
  <r-swiperitem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/154196/24/3833/121212/5f97d34cEa985896f/e20033d24c553704.jpg!q70.jpg.dpg" /></r-swiperitem>
  <r-swiperitem><img src="https://m.360buyimg.com/mobilecms/s700x280_jfs/t1/146862/39/13822/78049/5fa7e418E6c76569b/068b19049e17de7b.jpg!q70.jpg.dpg" /></r-swiperitem>
</r-swiper>
```
</div>



## API

<div class="r-doc-card">

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| direction  | 运动方向   | string   | `scrollLeft` `scrollTop` | `scrollLeft` |
| gap  | 运动间隔时长    | number   |  | `2000` |
| autoPlay  | 自动播放    | boolean   | `true` `false` | `true` |
</div>


<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数  |
|---------- |-------- |---------- |
| on-page  | 滚动到下一张时回调函数  |（current, total） |
</div>



<div class="r-doc-card">

### Slots
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | SwiperItem |
| pagination  | 页码指示器  |
</div>



<div class="r-doc-card">

### SwiperItem Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| styleObj  | SwiperItem样式   | object   |  | `{}` |
</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-click  | 点击SwiperItem回调函数  |  event |
</div>


<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 内容    |
</div>



<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
