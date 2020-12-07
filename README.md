# rong-ui2

> 基于Vue.js 2.0 UI组件库.


## 示例

#### 链接

[点击链接查看示例](https://rong360.github.io/rong-ui2/demo/index.html#/)

#### 扫描二维码体验

![Alt text](https://static.rong360.com/upload/png/52/2b/522b2db3748056c80e21fda4921c8123.png)

## 使用说明

### 安装

```bash

npm install rong-ui2 --save

```

### 引入

#### 按需引用

```js
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "rong-ui2",
    "libraryDirectory": "src/components"
  }]]
}

然后这样按需引入组件，就可以减小体积了：
import {Titlebar, Button} from 'rong-ui2';
Vue.use(Titlebar)
Vue.use(Button)

注意：项目需要安装less文件：
npm install less less-loader --save-dev （低版本可以用less@^2.7.2 less-loader@^4.0.3）
```

#### 引入所有组件

```js
import RongUi2 from 'rong-ui2';
import 'rong-ui2/dist/styles/rong-ui.css'
Vue.use(RongUi2)
```


### 使用

Dialog提示框、Toast弹框、Loading加载中、Keyboard虚拟数字键盘 均以挂载到Vue.prototype，引入后，直接使用$dialog(options),$toast(options),$loading(options),$keyboard(options)使用

其他组件未挂载到Vue.prototype上，组件名均已UpperCamelCase命名

如Title标题组件，html如下：

```html

<Titlebar theme="a" title="Title标题"></Titlebar>

```

## 说明文档

各组件说明文档如下：

| 组件      | 文档地址    |
|---------- |--------
|Dialog 弹框| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/dialog.md)|
|Toast 提示| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/toast.md)|
|Loading 加载中 | [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/loading.md)|
|Titlebar 标题栏| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/titlebar.md)|
|FlexFixed 吸顶或吸底| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/flexfixed.md)|
|TextScroll 吸顶或吸底| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/textscroll.md)|
|Swiper 按钮| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/swiper.md)|
|Steps 按钮| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/steps.md)|
|Button 按钮| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/button.md)|
|Input 输入框| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/input.md)|
|Select 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/select.md)|
|SelectDate 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/selectdate.md)|
|Datepicker 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/datepicker.md)|
|Checkbox 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/checkbox.md)|
|Radio 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/radio.md)|
|Form 表单| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/form.md)|
|Range 滑动范围| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/range.md)|
|Switch 下拉列表| [点击查看](https://github.com/rong360/rong360.github.io/blob/master/rong-ui2/doc/switch.md)|
