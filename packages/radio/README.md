# Radio 单选框


<div class="r-doc-card">

### 介绍
在一组备选项中进行单选。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Radio } from 'rong-ui2';

Vue.use(Radio)
```
</div>

## 基本用法

<div class="r-doc-card">

```html
单个radio，绑定到布尔值：
<r-radio v-model="single">Radio</r-radio>
```

```html
多个radio，绑定到同一个字符串：
<r-radio v-model="picked" value="apple">苹果</r-radio>
<r-radio v-model="picked" value="pear">梨</r-radio>
<r-radio v-model="picked" value="banana">香蕉</r-radio>
```
</div>



## API

<div class="r-doc-card">

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checkedValue  | 可以使用 v-model 双向绑定数据   | `boolean` `string`   | `true` `false` `""`  | `true` |
| value  | radio的值    | string   |  |  |
</div>



<div class="r-doc-card">

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-change  | 点击checkbox回调函数  |  event |
</div>




<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | radio标题   |
</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 默认值 | 描述 |
| ---- | --- | --- |
| @radio-unchecked-color | #dcdee2 | |
| @radio-checked-color | @primary-color | |

</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>

