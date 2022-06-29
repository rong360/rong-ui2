# Toast 提示



<div class="r-doc-card">

### 介绍
在页面中间弹出黑色半透明提示，用于消息通知、加载提示、操作结果提示等场景。

</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Toast } from 'rong-ui2';

Vue.use(Toast)
```
</div>


## 基本用法
<div class="r-doc-card">

```js
this.$toast("芭芭拉小魔仙，变身");

this.$toast({
    propsData: {
        message: '芭芭拉小魔仙，变身!',
        type: 'positive',
        time: 5000
    },
    methods: {
        callback(){
            self.count++;
        }
    }
});
```

or
```js
this.$toast.long("芭芭拉小魔仙，变身")
this.$toast.positive("芭芭拉小魔仙，变身")
this.$toast.negetive("芭芭拉小魔仙，变身")
```

</div>


<div class="r-doc-card">

### 自定义icon
```js
import ClockCircle from './ClockCircle.vue'

this.$toast({
  propsData: {
    // icon: h => h('span', { domProps: { innerHTML: 'Icon' } }),
    // icon: { template: '<span>Icon</span>' },
    icon: h => h(ClockCircle),
    message: '自定义icon'
  }
})
```

</div>



<div class="r-doc-card">

### 全局配置Toast
全局可配置的参数有：`time`
```js
import {Toast} from 'rong-ui2'
Toast.config({
  time: 3000
})
Vue.use(Toast)
```
or
```js
import RongUi2, { Toast } from 'rong-ui2'
Toast.config({
  time: 3000
})
Vue.use(RongUi2)
```

</div>


## API
<div class="r-doc-card">

toast实例方法通过`子类组件`覆盖基类组件的的方式实现，因此传入的对象是组件相关的一些属性：propsData、methods、computed、mounted...

### propsData属性传入的数据如下：

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type  | icon类型    | string   | `positive` `negetive` `long` | `long` |
| time  | 多少ms后toast消失    | number   | — | `2000` |
| message  | 提示内容    | string   | -  | "" |
| wrapStyleObj | 样式 | object | - | `{top: '35%'}` |
| containerStyle(v1.2.5) | 内容区样式 | object | - | - |
| callback | 消失时回调函数 | function | - | - |
| icon(v1.2.5) | 自定义icon | `object` `function` | `.vue` `h => h(xxx)`| "" |

</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 描述 | 默认值 |
| ---- | --- | --- |
| @toast-icon-color | toast颜色 | #fff |
| @toast-icon-size | toast大小 | 30px |
| @toast-inner-width | toast宽度 | 184px |
| @toast-inner-long-width | 长toast宽度 | 226px |
| @toast-inner-bg | 内容区域背景颜色 | @mask-container-bg |
| @toast-mask-bg | 遮罩层背景颜色 | @mask-bg |
</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
