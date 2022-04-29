# TextScroll


<div class="r-doc-card">

### 介绍
跑马灯效果。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { TextScroll } from 'rong-ui2';

Vue.use(TextScroll)
```
</div>



## 基本用法

<div class="r-doc-card">

```html
<TextScroll :list="list"></TextScroll>
```

```js
export default {
  data () {
    return {
      list: [
        '让子弹飞一会儿，网络流行词，是2010年末上映的电影《让子弹飞》中的一句对白。'
      ]
    }
  }
}
```
</div>




## API

<div class="r-doc-card">

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| list  | 文案列表   | Array  |  | `[]` |
</div>



<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| prepend  | scrollbar前插槽 |
| append  | scrollbar后插槽 |
</div>



<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
