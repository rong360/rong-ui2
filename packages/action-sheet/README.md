# ActionSheet

<div class="r-doc-card">

### 介绍
底部弹出动作菜单面板。

</div>



<div class="r-doc-card">

### 引入
通过以下方式来全局注册组件
```js
import Vue from 'vue'
import { ActionSheet } from 'rong-ui2';

Vue.use(ActionSheet)
```
</div>


## 基本用法
<div class="r-doc-card">

```html
<r-actionsheet v-model="showActionSheet" title="标题" :actions="actions"  @on-select="handleSelect" @on-close="handleClose"></r-actionsheet>
```

```js
export default {
  data () {
    return {
      actions: [
        { name: '选项一', color: 'red' },
        { name: '选项二', disabled: true },
        { name: '选项三' }
      ],
      showActionSheet: false
    }
  },
  methods: {
    handleSelect (item) {
      this.showActionSheet = false
    },
    handleClose () {
    }
  }
}
```

</div>




<div class="r-doc-card">

### slot
| slot名称      | 说明    |
|---------- |-------- |
| default  | 自定义面板的展示内容   |

</div>



## API
<div class="r-doc-card">

| 参数      | 说明    | 类型      |  默认值   |
|---------- |-------- |---------- | -------- |
| v-model:show | 是否显示动作面板 | boolean | `false` |
| actions | 面板选项列表 | array | [] |
| radius | 是否显示圆角 | boolean | `true` |
| title | 面板标题 | string |  |
| showCloseBtn | 是否显示右上角关闭按钮 | boolean | `false` |
| showCancelBtn | 是否显示底部取消按钮 | boolean | `true` |
| cancelBtnText | 底部取消按钮文案 | string | `取消` |
| closeOnClickMask`v1.2.7` | 是否在点击遮罩层后关闭 | boolean | `true` |


### actiions数据结构
| 键名      | 说明    | 类型      |
|---------- |-------- |---------- |
| name  | 标题   | string |
| color  | 选项文字颜色  | string |
| disabled  | 是否为禁用状态  | boolean |

</div>



<div class="r-doc-card">

### Events

| 事件名称      | 说明    | 回调参数      |
|---------- |-------- |---------- |
| on-select  | 点击选项时触发，禁用或加载状态下不会触发    | (item, index）|
| on-close  | 页面关闭时触发    | - |


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
