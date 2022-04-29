## Switch开关


<div class="r-doc-card">

### 介绍
用于在打开和关闭状态之间进行切换。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Switch } from 'rong-ui2';

Vue.use(Switch)
```
</div>




## 基本用法

<div class="r-doc-card">

```html
<r-switch v-model="switchVal"></r-switch>
```
</div>



# API

<div class="r-doc-card">

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 绑定的值，可使用 v-model 双向绑定   | Boolean  | `true` `false` | `false` |
| disabled  |禁用开关   | Boolean  | `true` `false` | `false` |
</div>




<div class="r-doc-card">

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-change  | 开关变化时触发，返回当前的状态  |`true` `false` |
</div>



<div class="r-doc-card">

### Slots
| slot名称      | 说明    |
|---------- |-------- |
| open  | 自定义显示打开时的内容  |
| close  | 自定义显示关闭时的内容  |
</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
