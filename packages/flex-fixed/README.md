# FlexFixed (flex布局)


<div class="r-doc-card">

### 介绍
header和footer可以固定展示，不随页面滚动。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { FlexFixed } from 'rong-ui2';

Vue.use(FlexFixed)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<template>
  <r-flexfixed @on-scroll="scroll" @on-scroll-debounce="scrollDebounce">
    <Titlebar slot="header">标题</Titlebar>
    <p>content 1</p>
    <p>content </p>
    <p>content </p>
    <p>content 2</p>
    <p>content </p>
    <p>content </p>
    <p>content 3</p>
    <p>content </p>
    <p>content </p>
    <p>content </p>
    <p>content 4</p>
    <p>content </p>
    <p>content </p>
    <p>content 5</p>
    <p>content </p>
    <p>content </p>
    <p>content 6</p>
    <p>content </p>
    <p>content </p>
    <p>content 7</p>
    <p></p>
    <Button slot="footer">下一步</Button>
  </r-flexfixed>
</template>
```

```js
  methods: {
    scroll ({scrollTop, maxScrollTop, direction}) {
      if( (maxScrollTop-scrollTop) < 10 ){
          console.log('滚动底啦~')
      }
    },
    scrollDebounce ({scrollTop, maxScrollTop, direction}) {
      if( (maxScrollTop-scrollTop) < 10 ){
          console.log('滚动底啦~')
      }
    }
  }

```
</div>


## API
<div class="r-doc-card">

### props
| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| hideFooterOnKeyboardShow | 键盘弹起时隐藏footer | boolean | - | `false` |
| useFixed(v1.2.3) | header、footer采用position: fixed方式固定。滚动区域为整个屏幕 | boolean | - | `false` |

</div>


<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 滚动区域   |
| header  | 头部   |
| footer  | 底部   |
</div>



<div class="r-doc-card">

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-scroll  | 滚动事件    | ({scrollTop, maxScrollTop, direction}）|
| on-scroll-debounce  | 滚动事件    | ({scrollTop, maxScrollTop, direction}）|
</div>



<div class="r-doc-card">

### 特别提示
嵌套overflow-x:scroll 或 overflow-y:scroll滚动元素时需在滚动元素上添加scroll-area样式
```html
如<div style="overflow-x:scroll" class="scroll-area"></div>
```
</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>


