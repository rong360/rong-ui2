# Titlebar 标题


<div class="r-doc-card">

### 介绍
为页面提供导航功能，常用于页面顶部。

</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Titlebar } from 'rong-ui2';

Vue.use(Titlebar)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<r-titlebar theme="d" title="主题d">
    <div slot="l" @click="goHome">首页</div>
    <div slot="r" @click="goCenter">账户</div>
</r-titlebar>

```
</div>



## API
<div class="r-doc-card">

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title  | 标题文案   | string   |   | |
| theme  | 标题栏背景主题    | string   | `a` `b` `c` `d` `e` `f` | `a` |
| showBackto  | 是否显示返回按钮    | Boolean   |  |   `true`  |
| backArrowStyle  | 箭头自定义样式    | object   | | `{}` |
</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-back  | 点击返回按钮触发的操作    |  |
</div>




<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| l  | 左侧内容区    |
| 不具名slot  | 中间内容区，默认显示标题    |
| r  | 右侧内容区    |
</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 描述 | 默认值 |
| ---- | --- | --- |
| @titlebar-height | 高度 | 45px |
| @titlebar-background | 背景 | transparent |
| @titlebar-arrow-size | 返回按钮大小 | 16px |
| @titlebar-arrow-color | 返回按钮颜色 | #333 |
| @titlebar-title-text-color | 字体颜色 | #333 |
| @titlebar-title-font-size | 字体大小 | 17px |


</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
