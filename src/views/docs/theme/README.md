
# 定制主题

<div class="r-doc-card">

### 介绍
rong-ui2 提供了一套默认主题，方便使用者覆盖样式。如果你想完全替换主题色或者其他样式，可以按照本文档进行主题定制。

</div>

<div class="r-doc-card">

### 样式变量
rong-ui2 使用了 Less 对样式进行预处理，并内置了一些样式变量，通过替换样式变量即可定制你自己需要的主题。

下面是所有的基础样式变量，组件的颜色变量请参考各个组件的文档

```js
// ---- color ----
@primary-color: #4080e8;
@text-color: #333;
@text-color-red: #fa5050;
@disabled-color: #999999;
@placeholder-color: #c8c7cc;

// ---- base ----
@mask-bg: rgba(0, 0, 0, 0.5);
@mask-container-bg: rgba(0, 0, 0, 0.87);

// ---- Border color ----
@border-color-red: @text-color-red;
@form-item-border-bottom-color: #f2f2f4;
@form-item-padding-right: 15px;

// ---- Animation ----
@animation-duration: 0.25s;
@transition-duration: 0.2s;
@transition-duration-slow: 0.4s;
```

</div>


## 定制方法
<div class="r-doc-card">

### 修改样式变量
 npm install style-resources-loader --save-dev

如果 vue-cli2 搭建的项目，可以在 utils.js 中进行配置。
```js
return {
  css: generateLoaders(),
  postcss: generateLoaders(),
  less: generateLoaders('less').concat({
    loader: 'style-resources-loader',
    options: {
      patterns: [path.resolve(__dirname, '../src/assets/css/var.less')],
      injector: 'append'
    }
  }),
  sass: generateLoaders('sass', { indentedSyntax: true }),
  scss: generateLoaders('sass'),
  stylus: generateLoaders('stylus'),
  styl: generateLoaders('stylus')
}
```

如果 vue-cli 搭建的项目，可以在 vue.config.js 中进行配置。
```js
const path = require('path');
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 这三种 patterns 写法都是可以的
      // patterns: ["./src/assets/reset1.less", "./src/assets/reset2.less"]
      // patterns: "./src/assets/reset.less"
	  patterns: [
        path.resolve(__dirname, './src/assets/reset.less')//这里的路径不能使用 @ 符号，否则会报错
      ]
    }
  }
};
```
</div>
