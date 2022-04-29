
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

#### 自定义loading
```js
import {Loading, Titlebar, Input} from 'rong-ui2'
Loading.config({
  loading: require('./components/LoadingCattle.vue') // 项目中添加Loading组件
})
Vue.use(Loading)
Vue.use(Titlebar)
Vue.use(Input)
```
or
```js
import rongUI2, {Loading} from 'rong-ui2'
Loading.config({
  loading: require('./components/LoadingCattle.vue')
})
Vue.use(rongUI2)
```

</div>




## API
<div class="r-doc-card">

loading实例方法通过`子类组件`覆盖基类组件的的方式实现，因此传入的对象是组件相关的一些属性：propsData、methods、computed、mounted...

#### propsData属性传入的数据如下：

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| text  | 加载文案    | string   |   | `false` |
| width  | loading区的长度（750px设计图下）    | number   |  | `100` |
| cwidth  | loading区圆圈的大小（750px设计图下）    | number   |  | `30` |
| textInside  | 文案位置是否在圆圈内    | boolean   |  | `false` |
| color  | loading圆圈的颜色    | string   |  | `#4080e8` |
| textColor  | 文案的颜色   | string   |  | `#ffffff` |
| textFontSize  | 文案的字体大小（750px设计图下）    | number   |  | `28` |

</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
