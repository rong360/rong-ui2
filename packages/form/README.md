# Form 表单


<div class="r-doc-card">

### 介绍
具有数据收集、校验和提交功能的表单，包含复选框、单选框、输入框、下拉选择框等元素。
</div>




## 基本用法

<div class="r-doc-card">

```html
<r-form>
  <r-input type="text" name="username" maxlength="6" v-model="userName"></r-input>
  <r-input v-bind="user" v-model="user.value"></r-input>
  <r-select v-bind="email" v-model="email.value"></r-select>
</r-form>
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
      },
      email: {
        "title": "邮箱",
        "name": "email",
        "type": "email",
        "data": "",
        "value": "",
        "emailList": [
          "qq.com",
          "sina.com",
          "sohu.com",
          "163.com",
          "foxmail.com",
          "gmail.com",
          "rong360.com",
          "edu.cn",
          "outlook.com",
          "vip.qq.com",
          "126.com"
        ],
        "rules": [{
          "required": true,
          "message": "邮箱不能为空",
          "trigger": "blur"
        },
        {
          "type": "email",
          "message": "邮箱格式不正确",
          "trigger": "blur"
        }]
      }
    }
  }
}
</script>
```
</div>




## API

<div class="r-doc-card">

### Props
| 属性      | 说明    | 类型      |  可选值      |默认值       |
|---------- |-------- |---------- |-------------  |-------------  |
| placeholder | 占位文本 | string | - | - |
| label-width | lebel标签宽度 | string | 如 `150px` `10rem`等 |-|
| label-position | label标签对齐方式 | string | `left` `right` `top`  | `left` |
| text-position | input文字对齐方式 | string | `left` `center` `right`  | `left` |
| input-clear-style | 清空按钮样式 | object | - | {} |
| select-arrow-style | 清空按钮样式 | object | - | {} |
| select-cancel-btn-text | select取消按钮文案 | string | - | `取消` |
| select-confirm-btn-text | select确定按钮文案 | string | - | `确定` |
| date-picker-cancel-btn-text | date-picker取消按钮文案 | string | - | `取消` |
| date-picker-confirm-btn-text | date-picker确定按钮文案 | string | - | `确定` |
| show-message | 是否显示错误信息 | boolean | - | true |
| mode  | title添加css效果    | string   | `default` `to-top`  | `default` |
| error-at-placeholder  | error显示在placeholder位置   | boolean | - | false |
</div>



<div class="r-doc-card">

### Events
| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-iscompleted | 表单是否填完 | boolean |

### methods
| 名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| validate | 校验所有表单项 | （result, message） |
| validateOneByOne | 逐项校验表单项 |（result, message）|
| getValue | 获取当前组件表单数据 | {name: name, value: value} |
| getSerializeValue | 获取当前组件表单数据 |a=0&b=1 |
| getObjectValue | 获取当前组件表单数据 | {a: 0, b: 1} |
| resetFields | 重置表单 |- |
</div>



<div class="r-doc-card">

### Slots
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 内容 |
</div>


<div class="r-doc-card">

### Form特殊效果
* [Form表单动态注册效果](#/formdynamicregistration)
* [Form表单添加css效果](#/formcss)
</div>

<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
