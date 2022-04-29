# Input 输入框


<div class="r-doc-card">

### 介绍
用户可以在文本框内输入文字、整数、浮点、邮箱、身份证、手机号等类型。
</div>


<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Input } from 'rong-ui2';

Vue.use(Input)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<r-input type="text" name="username" maxlength="6" v-model="userName"></r-input>
<r-input v-bind="user" v-model="user.value"></r-input>
```

```js
<script>
export default {
  data () {
    return {
      userName: 'zyx',
      user: {
        "title": "本人姓名",
        "placeholder": "",
        "name": "bureau_user_name",
        "type": "text",
        "value": "",
        "maxlength": 6
      }
    }
  }
}
</script>
```
</div>



## API
<div class="r-doc-card">

### props
| 属性      | 说明    | 类型      |  可选值      |默认值       |
|---------- |-------- |---------- |-------------  |-------------  |
| placeholder | 占位文本 | string | - | - |
| label-width | lebel标签宽度 | string | 如 `150px` `10rem`等 |-|
| label-position | label标签对齐方式 | string | `left` `right` `top`  | `left` |
| text-position | input文字对齐方式 | string | `left` `center` `right`  | `left` |
| input-clear-style | 清空按钮样式 | object | - | {} |
| show-message | 是否显示错误信息 | boolean | - | true |
| required（v1.1.3） | 是否必填 | boolean | - | true |
| className（v1.1.3） | 自定义class | string | - | - |

<font color='red'>特别说明：v1.2.2之前版本下列参数通过attrs对象传入 :attrs="{}"</font>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| type | 表单类型 | string | `text` `number` `tel` `email` `IDCard`  | `text` |
| title | 表单label | string |  |  |
| name  | 表单name    | string   |  |  |
| value | 默认值 | string | | |
| placeholder  | 输入框提示文案    | string   | | `` |
| maxlength  | 输入框最大输入长度    | number   |  |  |
| fixed  | 保留几位小数    | number   |  |  |
| disabled  | 输入框是否禁用   | boolean   |  | `false` |
| readonly  | 输入框是否只读    | boolean   |  | `false` |
| unit  | 输入项单位    | string   |  | `""` |
| rules  | 类iview风格的校验规则    | array   |  | `[{required: true, message:'xxx不能为空', trigger:'blur'}]` |
| mode  | title添加css效果    | string   | `default` `to-top`  | `default` |
| error-at-placeholder  | error显示在placeholder位置   | boolean | - | false |
| required（v1.1.3）  | 是否必填   | boolean | - | true |
| className（v1.1.3）  | 自定义class   | string | - | - |
| emailList（v1.1.5）  | 邮件后缀列表 | array | - | - |
| clearable（v1.2.2）  | 是否显示清空按钮 | Boolean | true | - |
| onInput（v1.2.2）  | input回调 | function | (e, component)| - |
| onBlur（v1.2.2）  | blur回调 | function | (e, component)| - |
	特别说明，rules校验规则文档详见https://www.npmjs.com/package/async-validator
</div>



<div class="r-doc-card">

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-input | 输入框输入事件 | event |
| on-change  | 输入变化    | event |
| on-focus  | 聚焦    | event |
| on-blur  | 失焦    | event |
| on-enter | 回车键 |  event |
| on-clear | 清空输入时触发 | event |
| on-keyup | keyup | event |
| on-keydown | keydown | event |
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
</div>



<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
