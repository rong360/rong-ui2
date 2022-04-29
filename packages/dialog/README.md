# Dialog 弹框


<div class="r-doc-card">

### 介绍
模态对话框，在浮层中显示，引导用户进行相关操作，支持图片以及单文件组件等对话框。

</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { Dialog } from 'rong-ui2';

Vue.use(Dialog)
```
</div>


## 基本用法
<div class="r-doc-card">

### 函数调用
挂载在vue.prototype上，vue实例中，直接使用this.$dialog({options})使用。
```js

var dialog = this.$dialog({
	propsData: {
		//标题
		showTitle: true,
		title: '标题',
		titleStyleObj: {color:'green'},
    },
    methods: {
    	//取消按钮
    	onCancel: function(){
    		this.remove();
    	},
    	//确认按钮
    	onConfirm: function(){
    		alert('点击了确认按钮');
    	}
    }
});

```

弹窗中插入组件 (v1.1.2版本开始 message支持Render 写法)
```
let RepaymentTip = resolve => resolve(require("./repaymentTip.vue"))
this.$dialog({
    propsData: {
        // 内容(文本或自定义组件)
        message: (h) => h(RepaymentTip, {props: { name: 'zyx' }})
    },
    methods: {
        onConfirm: function () {
            this.remove();
        }
    }
});
------ ./repaymentTip.vue ------
<template>
    <div>
        hello {{name}}
    </div>
</template>

<script type="text/javascript">
    export default {
        props: ['name']
    }
</script>
```
or
```
this.$dialog({
    propsData: {
        message: (h) => h({
          template: `<div> hello {{name}} </div>`,
          props: ['name']
        }, {props: { name: 'zyx' }})
    },
    methods: {
        onConfirm: function () {
            this.remove();
        }
    }
});
```

### template模板中插入Dialog
```html
在template模板中使用时，可借助portal-vue插件，把Dialog显示在文档的任意位置。Dialog是否显示可通过v-model双向绑定，在回调函数中可通过第二个参数获得dialog实例关闭dialog
// https://www.npmjs.com/package/portal-vue
// https://portal-vue.linusb.org/api/portal.html
<template>
    <div>
        <portal to="modal">
            <Dialog v-model="showDialog" :showCancelBtn="false" @on-confirm="onConfirm" @on-cancel="onCancel">
                <p>test</p>
                <div class="hasread" @click="doRead">我已经阅读 <a href="javascript:;">《用户知情书》</a></div>
            </Dialog>
        </portal>
    </div>
</template>
onCancel (e, dialog) {
  // this.showDialog = false
  dialog.remove()
},
------ app.vue ------
<template>
  <div id="app">
    <router-view></router-view>
    <portal-target name="modal" multiple />
  </div>
</template>
```

#### dialog 拓展
```html
1，this.$dialog.tip({ message: 'hello', confirmBtnText: 'Ok', onConfirm: function () { this.remove() } })
2，this.$dialog.confirm({ message: 'hello', confirmBtnText: 'confirm', cancelBtnText: 'cancel', onConfirm: function () { }, onCancel: function () { this.remove() } })
3，this.$dialog.select({ menus: [{title: '操作1'}, {title: '操作2'}], cancelBtnText: '取消', onCancel: function () { this.remove() }, onSelect: function (obj) { console.log(obj); this.remove() } })
```

</div>



## API
<div class="r-doc-card">

dialog实例方法通过`子类组件`覆盖基类组件的的方式实现，因此传入的对象是组件相关的一些属性：propsData、methods、computed、mounted... <br/>
弹窗大致由以下几部分元素：`弹窗标题`、`右上角close按钮`、`弹窗内容`、`弹窗cancel按钮`、`弹窗confirm按钮`
#### propsData属性传入的数据如下：

| 参数      | 说明    | 类型      | 可选值       | 默认值   |
|---------- |-------- |---------- |-------------  |-------- |
| showTitle  | 是否显示标题    | boolean   | `true` `false`  | `false` |
| title  | 标题内容    | string   |  | `''` |
| titleStyleObj  | 标题样式    | Object   | — | {} |
| showCloseBtn  | 是否显示关闭按钮    | boolean   | — | `false` |
| closeStyleObj  | 标题样式    | Object   | — | {} |
| message  | 弹框内容（普通文本或简单html，v1.1.2支持render函数）    | string, function  | — | '' |
| contentStyleObj  | 内容样式    | object   | — | {} |
| showCancelBtn  | 是否显示取消按钮   | boolean   | — | `true` |
| cancelBtnText  | 取消按钮文案    | string   | — | `取消` |
| cancelBtnStyleObj  | 取消按钮样式    | object   | — | `false` |
| showConfirmBtn  | 是否显示确认按钮    | boolean   | — | `true` |
| confirmBtnText  | 确认按钮文案    | string   | — | `确认` |
| confirmBtnStyleObj  | 确认按钮样式    | object   | — | {} |
| CliperStyleObj  | 遮罩样式    | object   | — |  |
| dlgStyleObj  | 弹框样式    | object   | — |  |
| position  | 弹框位置    | object   | {x: 'left/center/right',y: 'top/center/bottom'} | {x: 'center', y: 'center'} |
| removeDialogOnHashChange | hash变化时是否移除dialog | boolean | — | `false` |
| className(v1.1.3) | 自定义样式 | string | — | `''` |

</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-cancel  | 取消操作    | — |
| on-confirm  | 确认操作    | — |
| on-close  | 关闭点击操作    | — |

</div>



<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| 不具名slot  | 弹框内容    |

</div>



<div class="r-doc-card">

### 特别提示
弹框里插入滚动区域时，需在滚动区域上添加"scroll-area"样式，如:
```html
<div class="scroll-area"></div>
```

</div>




<details>
  <summary>查看右侧demo源码</summary>
  <div class="r-doc-card">
  {{demo}}
  </div>
</details>
