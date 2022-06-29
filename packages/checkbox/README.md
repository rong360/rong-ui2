# Checkbox 复选框



<div class="r-doc-card">

### 介绍
在一组备选项中进行多选。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Checkbox } from 'rong-ui2';

Vue.use(Checkbox)
```
</div>



## 基本用法
<div class="r-doc-card">

```html
单个复选框，绑定到布尔值：
<r-checkbox v-model="checked">北京</r-checkbox>
```

```html
多个复选框，绑定到同一个数组：
<r-checkbox v-model="fruitList" value="apple">苹果</r-checkbox>
<r-checkbox v-model="fruitList" value="pear">梨</r-checkbox>
<r-checkbox v-model="fruitList" value="banana">香蕉</r-checkbox>
```
</div>


# API
<div class="r-doc-card">

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| checkedValue  | 可以使用 v-model 双向绑定数据   | `boolean` `array`   | `true` `false` `[]`  | `true` |
| value  | 复选框的值    | string   |  |  |
| shape  | checkbox形状    | string   | `square` `circle` `rect`| `square` |
| twoToneColor  | type为circle，终点渐变色（也可通过 Vue.prototype.checkCircleTwoToneColor = 'red' 进行全局设置） | string  | | |
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
| 不具名slot  | checkbox标题   |
| prepend  | 前置内容(v.1.1.4) |
</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 默认值 | 描述 |
| ---- | --- | --- |
| @checkbox-font-size | 14px |
| @checkbox-margin-right | 8px |
| @checkbox-circle-icon-size | 16px |
| @checkbox-circle-icon-color | @primary-color |
| @checkbox-square-width | 16px |
| @checkbox-square-height | 16px |
| @checkbox-square-uncheck-border-color | #dcdee2 |
| @checkbox-square-background-color | @primary-color |
| @checkbox-square-border-radius | 2px |
| @checkbox-rect-width | 78px |
| @checkbox-rect-height | 30px |
| @checkbox-rect-background-color | #e5e5e5 |
| @checkbox-rect-checked-background-color | #666 |
| @checkbox-rect-border-radius | 4px |
| @checkbox-rect-font-size | 12px |
| @checkbox-rect-margin-top | 5px |
| @checkbox-rect-margin-right | 10px |

</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
