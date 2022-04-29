# Range 滑动范围

<div class="r-doc-card">

### 介绍
注意这个滑动效果在手机模式下正常展示，可以复制链接在新窗口中打开测试。
</div>



## 基本用法
<div class="r-doc-card">

```html
<Range v-model="config0.amount" :min="config0.min" :max="config0.max" :step="config0.step">
  <span slot="start">{{config0.min}}</span>
  <span slot="end">{{config0.max}}</span>
</Range>
```

```js
...
data(){
  return {
    config0: {
      amount: 20000,
      min: 0,
      max: 100000,
      step: 5000
    }
}
```
</div>



## API
<div class="r-doc-card">

### Props

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value  | 滑块的值  | number |   |  |
| min  | 最小值  | number |   |  |
| max  | 最大值  | number |   |  |
| step  | 步长  | number |   |  |
| disabled  | 是否禁用  | Boolean |   | false |
</div>



<div class="r-doc-card">

### Slots

| name      | 说明    |
|---------- |-------- |
| start  | 滑块左侧 |
| end  | 滑块右侧 |
</div>



<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
