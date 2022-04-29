# Datepicker 时间选择


<div class="r-doc-card">

### 介绍
时间选择器，支持年月日、日月年、年月、日等维度。
</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { DatePicker } from 'rong-ui2';

Vue.use(DatePicker)
```
</div>




## 基本用法
<div class="r-doc-card">

```html
<r-datepicker v-bind='config1' @onconfirm="birthDate"></r-datepicker>
```

```js
...
data(){
	return {
		config: {
			value: '2022/10/22',
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




## API

<div class="r-doc-card">

### Props
<font color='red'>特别说明：v1.2.2之前版本下列参数通过attrs对象传入 :attrs="{}"</font>

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| value | 默认显示日期 | string | | |
| valueFormat | value日期格式 | string, function | `yyyy` `yyyy/mm` `yyyy-mm-dd` `yyyy年` `yyyy年mm月dd日`等 |  `yyyy/mm/dd` |
| textFormat | placeholder区域日期显示格式 | string, function | `yyyy` `yyyy/mm` `yyyy-mm-dd` `yyyy年` `yyyy年mm月dd日`等 |  `yyyy/mm/dd` |
| placeholder  | 日期选择提示词    | string   |  | `请选择日期` |
| disabled  | 是否禁用   | boolean   |  | `false` |
| startYear  | 起始年份    | string,number   |  |  this year |
| endYear  | 截止年份    | string,number   |  |  |
| offsetYear  | startYear的偏移量    | string,number   | 负数、0、正数 | `0` |
| yearsLength  | 年份跨度    | string,number   |  | `10` |
| columnsOrder  | 年月日顺序    | array   |  | `['year', 'month', 'day']` |
| language  | 语言(月份可显示英文等)    | string   | `zh` `en` `id` | `zh` |
| pickerTitle  | picker标题   | string   |  | `` |
| pickerCancelBtnText  | picker取消按钮文案   | string   |  | `取消` |
| pickerConfirmBtnText  | picker确定按钮文案   | string   |  | `确定` |
| pickerFormatter  | 可设置picker上年月日单位等   | function   | 回调参数(type, val) | `` |
</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| onconfirm  | 键盘收起事件    | （{year: "", month: "", date: "", value: ""}） - 年，月，日，选择值 |
</div>



<div class="r-doc-card">

### Slots
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 日期后面可以通过slot插入icon等    |
</div>


<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
