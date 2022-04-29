# Select 选择

<div class="r-doc-card">

### 介绍
提供多个选项集合供用户选择。
</div>



## 基本用法

<div class="r-doc-card">

```html
<r-select name="education" :data="education.data" v-model="education0"></r-select>
<r-select v-bind="education" v-model="education.value"></r-select>
```

```js
<script>
export default {
  data () {
    return {
      education0: '',
      education: {
        title: "教育程度",
        name: "education",
        value: '2',
        lr: "right",
        placeholder: "请选择贷款期限",
        readonly: true,
        data: [{
          text: "硕士及以上",
          value: "1"
        }, {
          text: "本科",
          value: '2'

        }, {
          text: "大专",
          value: "3"
        }, {
          text: "中专/高中及以下",
          value: "4"
        }]
      }
  }
}
</script>
```
</div>



## API

<div class="r-doc-card">

### Select props
| 属性      | 说明    | 类型      |  可选值      |默认值       |
|---------- |-------- |---------- |-------------  |-------------  |
| attrs | 表单配置项 | object | - | {}|
| placeholder | 占位文本 | string | - | - |
| label-width | lebel标签宽度 | string | 如 `150px` `10rem`等 |-|
| label-position | label标签对齐方式 | string | `left` `right` `top`  | `left` |
| text-position | select文字对齐方式 | string | `left` `center` `right`  | `left` |
| cancel-btn-text | 取消按钮文案 | string |   | `取消` |
| confirm-btn-text | 确认按钮文案 | string |   | `确认` |
| select-arrow-style | 清空按钮样式 | object | - | {} |
| show-message | 是否显示错误信息 | boolean | - | true |
| required（v1.1.3） | 是否必填 | boolean | - | true |
| className（v1.1.3） | 自定义class | string | - | - |


<font color='red'>特别说明：v1.2.2之前版本下列参数通过attrs对象传入 :attrs="{}"</font>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| title | 表单label | string |  |  |
| name  | 表单name    | string   |  |  |
| value | 默认值 | string | | |
| placeholder  | 输入框提示文案    | string   | | `` |
| disabled  | 输入框是否禁用   | boolean   |  | `false` |
| readonly  | 输入框是否只读    | boolean   |  | `false` |
| unit  | 输入项单位    | string   |  | `""` |
| cancelBtnText  | 取消按钮文案    | string   |  | `取消` |
| confirmBtnText  | 确定按钮文案    | string   |  | `取消` |
| rules  | 类iview风格的校验规则    | array   |  | `[{required: true, message:'xxx不能为空', trigger:'blur'}]` |
| mode  | title添加css效果    | string   | `default` `to-top`  | `default` |
| error-at-placeholder  | error显示在placeholder位置   | boolean | - | false |
| required（v1.1.3）  | 是否必填   | boolean | - | true |
| className（v1.1.3）  | 自定义class   | string | - | - |

	特别说明，rules校验规则文档详见https://www.npmjs.com/package/async-validator
</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-confirm | 确定按钮 | selectedOption |
</div>



<div class="r-doc-card">

### methods
| 名称      | 说明    | 参数      | 返回值 |
|---------- |-------- |---------- |---------- |
| getValue | 获取当前组件表单数据 | | {name: name, value: value} |
</div>



<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| prepend  | 前置内容 |
| append  | 后置内容 |
| arrow-icon  | 右侧箭头 |
</div>



<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>

