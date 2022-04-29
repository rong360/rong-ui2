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

this.$toast("芭芭拉小魔仙，变身");
```

or
```js
this.$toast.long("芭芭拉小魔仙，变身")
this.$toast.positive("芭芭拉小魔仙，变身")
this.$toast.negetive("芭芭拉小魔仙，变身")
```

</div>



## API
<div class="r-doc-card">

toast实例方法通过`子类组件`覆盖基类组件的的方式实现，因此传入的对象是组件相关的一些属性：propsData、methods、computed、mounted...

#### propsData属性传入的数据如下：

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| wrapStyleObj | 样式 | object | - | `{top: '35%'}` |
| message  | 提示内容    | string   | -  | "" |
| type  | icon类型    | string   | `positive` `negetive` `long` | `long` |
| time  | 多少ms后toast消失    | number   | — | `2000` |

### Events (methods属性下)

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| callback  | toast消失时回调函数    | — |

</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
