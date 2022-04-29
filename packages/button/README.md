# Button


<div class="r-doc-card">

### 介绍
按钮用于触发一个操作，如提交表单。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件。
```js
import Vue from 'vue'
import { Button } from 'rong-ui2';

Vue.use(Button)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<r-button>提交</r-button>
```
</div>



## 代码演示
<div class="r-doc-card">

### 按钮类型
按钮支持 default、warning、disabled 三种种类型，默认为 default。

```html
<r-button type="warning">提交</r-button>
<r-button type="disabled">提交</r-button>
```
</div>


## API
<div class="r-doc-card">

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| type  | 按钮类型   | string   | `default` `warning` `disabled`  | `default` |
| radius  | 按钮是否有圆角    | boolean   |  | false |
| fill  | 背景是否填充    | boolean   |  | true |
| className | 自定义 CSS class | string | | |
| style  | 自定义样式    | CSSProperties   | |  |
| onClick  | 点击button回调  | function   | |  |
</div>







<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
