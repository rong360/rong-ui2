<div class="r-doc-card">

### 安装
```bash
npm install rong-ui2 --save
```
</div>



<div class="r-doc-card">

### NPM 使用示例

#### 按需引用

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


然后这样按需引入组件，就可以减小体积了：
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

  webpack.base.conf.js
  {
    test: /\.js$/,
    loader: 'babel-loader',
    include: [resolve('node_modules/rong-ui/components')],
    exclude: [resolve('node_modules/rong-ui/components/rong-ui.js')]
  }
  </pre>
</details>


#### 导入全部组件

```js
import RongUi2 from 'rong-ui2';
import 'rong-ui2/lib/rong-ui2.css' // 配置babel-plugin-import插件时，无需再单独加载这个样式
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
</div>



<div class="r-doc-card">

### CDN 安装使用示例

```js
rong-ui2/lib/ 文件夹下含有所有组件的单独打包，可单独引用某个组件，如：
lib/button/index.js
lib/button/style/index.css

...

引入全部组件
lib/rong-ui2.js
lib/rong-ui2.css
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


