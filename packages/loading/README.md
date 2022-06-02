
# Loading 加载中



<div class="r-doc-card">

### 介绍
加载图标，用于表示加载中的过渡状态。

</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Loading } from 'rong-ui2';

Vue.use(Loading)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
// 默认
var loading = this.$loading();

setTimeout(function(){
    loading.remove();
}, 2000)

```

</div>




<div class="r-doc-card">

```html
// 倒计时
var loading = this.$loading({
	propsData: {
		text: '3s',
		textInside: true
	}
});

var count = 3;

var timer = setInterval(function(){
	count--;
	if(count == 0){
		loading.remove();
	}else{
		loading.text = count + 's';
	}
}, 1000)
```

</div>



<div class="r-doc-card">

### 全局自定义loading
```js
import {Loading, Titlebar, Input} from 'rong-ui2'
import LoadingCattle from './components/LoadingCattle.vue'
Loading.config({
  // loading: require('./components/LoadingCattle.vue') // 项目中添加Loading组件
  loading: h => h(LoadingCattle, { props: { color: 'red' } })
})
Vue.use(Loading)
Vue.use(Titlebar)
Vue.use(Input)
```
or
```js
import RongUi2, { Loading } from 'rong-ui2'
import LoadingCattle from './components/LoadingCattle.vue'
Loading.config({
  // loading: require('./components/LoadingCattle.vue') // 项目中添加Loading组件
  loading: h => h(LoadingCattle, { props: { color: 'red' } })
})
Vue.use(RongUi2)
```

</div>



<div class="r-doc-card">

### 局部自定义loading
```js
import LoadingCattle from './components/LoadingCattle.vue'

this.$loading({
  propsData: {
    message: `自定义loading`,
    loading: (h) => h(LoadingCattle, { props: { color: 'red' } })
  }
})
```

</div>


## API
<div class="r-doc-card">

loading实例方法通过`子类组件`覆盖基类组件的的方式实现，因此传入的对象是组件相关的一些属性：propsData、methods、computed、mounted...

### propsData属性传入的数据如下：

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| --- | --- | --- | --- | --- |
| type  | icon类型 | string | `circular` `spinner`  | `circular` |
| text  | 加载文案 | string | |  |
| iconStyle  | icon样式 | object |  |  |
| textStyle  | 字体样式 | object |  |  |
| loading | 自定义loading | object | `.vue文件` |  |
| removeDialogOnHashChange  | hash变化时移除dialog | boolean |  | `false` |

</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 描述 | 默认值 |
| ---- | --- | --- |
| @loading-icon-color | loading颜色 | #fff |
| @loading-icon-size | loading大小 | 30px |
| @loading-icon-animation-duration | 动画持续时间 | 0.8s |
| @loading-text-color | 字体颜色 | #fff |
| @loading-text-font-size | 字体大小 | 14px |
| @loading-mask-bg | 遮罩层背景颜色 | @mask-bg |
| @loading-container-bg | 内容区域背景颜色 | @mask-container-bg |
</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
