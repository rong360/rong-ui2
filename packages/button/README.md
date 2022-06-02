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
按钮支持 default、warning 两种类型，默认为 default。

```html
<r-button type="warning">提交</r-button>
```
</div>


## API
<div class="r-doc-card">

### Props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|:---------- |:-------- |:---------- |:-------------  |:-------- |
| type  | 按钮类型   | string   | `default` `warning` | `default` |
| disabled  | 是否禁用    | boolean   |  | false |
| radius  | 按钮是否有圆角    | boolean   |  | false |
| fill  | 背景是否填充    | boolean   |  | true |
| style  | 自定义样式    | CSSProperties   | |  |
| onClick  | 点击button回调  | function   | |  |
</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 描述 | 默认值 |
| ---- | --- | --- |
| @btn-height | 高度 | 45px |
| @btn-font-size | 字体大小 | 16px |
| @btn-default-background | 默认按钮背景 | -webkit-linear-gradient(0deg, #39b9ff, @primary-color) |
| @btn-default-border | 默认按钮边框 | none |
| @btn-default-color | 默认按钮字体颜色 | #fff |
| @btn-warning-color | 警告按钮字体样式 | #fff |
| @btn-warning-background | 警告按钮背景 | -webkit-linear-gradient(0deg, #ff8a71, #ff3061) |
| @btn-warning-border | 警告按钮边框 | none |
| @btn-warning-plain-color | 空心警告按钮字体颜色 | #ff3061 |
| @btn-warning-plain-border-color | 空心警告按钮边框颜色 | #ff3061 |
| @btn-disabled-color | 禁用按钮字体颜色 | @disabled-color |
</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
