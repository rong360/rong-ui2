
# Select2

<div class="r-doc-card">

### 介绍
下拉列表数据小于6条时固定展示，超过6条出滚动条。
</div>


<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Select2 } from 'rong-ui2';

Vue.use(Select2)
```
</div>



## API
<div class="r-doc-card">

### props
<font color="red">Select2 props 同Select组件</font>
</div>


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 默认值 | 描述 |
| ---- | --- | --- |
| @select2-inner-padding-right | @form-item-padding-right | - |
| @select2-inner-border-bottom-color | @form-item-border-bottom-color | - |
| @select2-inner-error-bottom-color | @form-item-error-border-color | - |
| @select2-inner-padding-top | @form-item-padding-top | - |
| @select2-inner-padding-bottom | @form-item-padding-bottom | - |
| @select2-label-font-size | 14px | - |
| @select2-label-color | @text-color | - |
| @select2-label-margin-right | 23px | - |
| @select2-select-font-size | 14px | - |
| @select2-select-color | @text-color | - |
| @select2-select-disabled-color | @disabled-color | - |
| @select2-select-placeholder-color | @placeholder-color | - |
| @select2-arrow-icon-size | @form-item-select-arrow-size | - |
| @select2-arrow-icon-color | @form-item-select-arrow-color | - |
| @select2-error-tip-color | @text-color-red | - |
| @select2-error-tip-font-size | 12px | - |

</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
