# Steps

<div class="r-doc-card">

### 介绍
用于展示操作流程的各个环节，让用户了解当前的操作在整体流程中的位置。
</div>



## 基本用法

<div class="r-doc-card">

```html
<Steps :current="1">
  <Step>基本信息<br>utama</Step>
  <Step>个人信息<br>darurat</Step>
  <Step>联系人<br>wajah</Step>
  <Step>活体识别<br>wajah</Step>
</Steps>
```
</div>



<div class="r-doc-card">

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| current  | 当前步骤，从 0 开始计数   | Number  |  | `0` |
| progressLine  |当前进度条样式   | Object  |  | `{}` |
| notProgressLine  |未开始进度条样式   | Object  |  | `{}` |
</div>


<div class="r-doc-card">

### Slots
| slot名称      | 说明    |
|---------- |-------- |
| icon  | 自定义 icon  |
</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
