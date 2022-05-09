<div class="r-doc-card">

### 安装
```bash
npm install rong-ui2 --save
```
</div>



<div class="r-doc-card">

### NPM 使用示例

#### 按需引用（推荐）

```js
npm install babel-plugin-import --save-dev

// .babelrc
{
  "plugins": [["import", {
    "libraryName": "rong-ui2",
    "libraryDirectory": "es",
    "style": "css"
  }]]
}


import {Titlebar, Button} from 'rong-ui2';
Vue.use(Titlebar)
Vue.use(Button)

```

<details>
  <summary>v1.2.3之前按需加载配置方式</summary>
  <pre>
  // .babelrc
  {
    "plugins": [["import", {
      "libraryName": "rong-ui2",
      "libraryDirectory": "src/components"
    }]]
  }

  注意：项目需要安装less文件：
  npm install less less-loader --save-dev （低版本可以用less@^2.7.2 less-loader@^4.0.3）
  </pre>
</details>


#### 导入全部组件（不推荐）
rong-ui2 支持一次性导入所有组件，引入所有组件会**增加代码包体积**，因此不推荐这种做法

```js
import RongUi2 from 'rong-ui2';
import 'rong-ui2/lib/style.css'
Vue.use(RongUi2)
```
<details>
  <summary>v1.2.3之前导入全部组件</summary>
  <pre>
  import RongUi2 from 'rong-ui2';
  import 'rong-ui2/dist/styles/rong-ui.css'
  Vue.use(RongUi2)
  </pre>
</details>

#### 手动按需引入组件（不推荐）
在不使用任何构建插件的情况下，可以手动引入需要使用的组件和样式。

```js
// 引入组件脚本
import Button from 'rong-ui2/es/button/index';
// 引入组件样式
import 'rong-ui2/es/button/style/index';
```
</div>



<div class="r-doc-card">

### CDN 安装使用示例

```js
引入全部组件
https://cdn.jsdelivr.net/npm/rong-ui2/lib/index.js
https://cdn.jsdelivr.net/npm/rong-ui2/lib/style.css

...

rong-ui2/lib/ 文件夹下含有所有组件的单独打包，可单独引用某个组件，如：
https://cdn.jsdelivr.net/npm/rong-ui2/lib/button/index.js
https://cdn.jsdelivr.net/npm/rong-ui2/lib/button/style/index.css

https://cdn.jsdelivr.net/npm/rong-ui2/lib/titlebar/index.js
https://cdn.jsdelivr.net/npm/rong-ui2/lib/titlebar/style/index.css

https://cdn.jsdelivr.net/npm/rong-ui2/lib/flex-fixed/index.js
https://cdn.jsdelivr.net/npm/rong-ui2/lib/flex-fixed/style/index.css
...

```

<details>
  <summary>v1.2.3之前cdn引入方式</summary>
  <pre>
  https://cdn.jsdelivr.net/npm/rong-ui2/dist/js/rong-ui.js
  https://cdn.jsdelivr.net/npm/rong-ui2/dist/styles/rong-ui.css
  注意：v1.2.3之前版本不支持cdn方式按需引入
  </pre>
</details>

</div>



<div class="r-doc-card">

### 使用
Dialog提示框、Toast弹框、Loading加载中、Keyboard虚拟数字键盘 均以挂载到Vue.prototype，引入后，直接使用$dialog(options),$toast(options),$loading(options),$keyboard(options)使用

其他组件未挂载到Vue.prototype上，组件名均已'r-组件小写'

template中格式如下：

```html
<r-titlebar></r-titlebar>
<r-button></r-button>
<r-flexfixed></r-flexfixed>
<r-scrollarea></r-scrollarea>

...

旧版使用PascalCase，后续可能会不兼容
<Titlebar theme="a" title="Title标题"></Titlebar>
```
</div>



<div class="r-doc-card">

### 移动端px转rem
npm install postcss-plugin-px2rem --save-dev

```js
// .postcssrc.js添加如下配置：
module.exports = {
  "plugins": {
    "postcss-plugin-px2rem": {
      // base on 320px standard.
      rootValue: 18.75,
      // to leave 1px alone.
      minPixelValue: 1.01
    }
  }
}
```

</div>
