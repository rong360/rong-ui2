# SelectDate 选择日期


<div class="r-doc-card">

### 介绍
提供多个选项集合供用户选择，支持单列选择和多列级联。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { SelectDate } from 'rong-ui2';

Vue.use(SelectDate)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<r-selectdate :title="config.title" :name="config.name"></r-selectdate>
<r-selectdate v-bind="config" v-model="config.value"></r-selectdate>
```

```js
...
data(){
	return {
		config: {
      title: '爸爸生日',
      name: 'birthday',
      value: '',
      placeholder: '请选择',
			valueFormat: 'yyyy/mm/dd',
			// textFormat: 'yyyy年mm月dd日',
			textFormat (val) {
				return `${val.year.text},${val.month.text.substr(0, 4)},${val.day.text}`
			},
			startYear: '',
			endYear: '',
			offsetYear: '',
			yearsLength: '',
			disabled: false,
			language: 'en',
			pickerFormatter: function (type, val) {
				// if (type == 'year') {
				//   return val + '年'
				// } else if (type == 'month') {
				//   return val + '月'
				// } else if (type == 'day') {
				//   return val + '日'
				// }
			},
			pickerTitle: 'hello',
			pickerCancelBtnText: 'cancel',
			pickerConfirmBtnText: 'confirm',
			columnsOrder: ['year', 'month', 'day']
      textPosition: 'right',
      mode: ''
    }
	}
},
methods: {
	doConfirm(date){
		console.log(date);
	}
}
```
</div>




### Attributes
### SelectDate基于Datepicker组件开发，Datepicker参数同样适合SelectDate
<font color='red'>特别说明：v1.2.2之前版本下列参数通过attrs对象传入 :attrs="{}"</font>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| 同Datepicker ...  |     |    |  |  |
| title | 表单label | string |  |  |
| name  | 表单name    | string   |  |  |
| value | 默认值 | string | | |
| placeholder  | 输入框提示文案    | string   | | `` |
| disabled  | 输入框是否禁用   | boolean   |  | `false` |
| unit  | 输入项单位    | string   |  | `""` |
| rules  | 类iview风格的校验规则    | array   |  | `[{required: true, message:'xxx不能为空', trigger:'blur'}]` |
| mode  | title添加css效果    | string   | `default` `to-top`  | `default` |



### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-confirm  | 键盘收起事件    | （{year: "", month: "", date: "", value: ""}） - 年，月，日，选择值 |

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 日期后面可以通过slot插入icon等    |


<div class="r-doc-card">

### 样式变量：
组件提供了下列 Less 变量，可用于自定义样式，使用方法请参考[主题定制](#/theme)。

| 名称 | 默认值 | 描述 |
| ---- | --- | --- |
| @selectdate-inner-padding-right | @form-item-padding-right | - |
| @selectdate-inner-border-bottom-color | @form-item-border-bottom-color | - |
| @selectdate-inner-error-bottom-color | @form-item-error-border-color | - |
| @selectdate-inner-padding-top | @form-item-padding-top | - |
| @selectdate-inner-padding-bottom | @form-item-padding-bottom | - |
| @selectdate-label-font-size | 14px | - |
| @selectdate-label-color | @text-color | - |
| @selectdate-label-margin-right | 23px | - |
| @selectdate-select-font-size | 14px | - |
| @selectdate-select-color | @text-color | - |
| @selectdate-select-disabled-color | @disabled-color | - |
| @selectdate-select-placeholder-color | @placeholder-color | - |
| @selectdate-arrow-icon-size | @form-item-select-arrow-size | - |
| @selectdate-arrow-icon-color | @form-item-select-arrow-color | - |
| @selectdate-error-tip-color | @text-color-red | - |
| @selectdate-error-tip-font-size | 12px | - |

<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
