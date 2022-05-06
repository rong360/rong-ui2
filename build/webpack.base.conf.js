'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const { VueLoaderPlugin } = require('vue-loader');
const fs = require('fs')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/doc.js',
    demo: `./src/${process.env.APP_ENTRY ? process.env.APP_ENTRY : 'demo.js'}`
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    chunkFilename: '[name].js?t=[chunkhash:7]',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      // 注意：如果utils.js文件里面已经添加了less、css这里不用添加上面后两个test了，否则会报错！！！
      // {
      //   test: /\.less$/,
      //   loader: "style-loader!css-loader!less-loader"
      // },
      {
        test: /\.js$/,
        use: { loader: 'babel-loader' },
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
      },
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        use: { loader: 'eslint-loader' },
        include: [resolve('src')],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 1 * 1024 // 1kb
          }
        },
        generator: {
          filename: utils.assetsPath('img/[name].[ext]?t=[hash:7]')
        }
      },
      {
        test: /.txt$/,
        loader: path.resolve(__dirname, './txt-loader')
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: false,
              preprocessor: (content, loaderContext) => {
                let demoPath = loaderContext.resourcePath.replace('README.md', '__demo__/index.vue')

                try {
                  let demo = fs.readFileSync(demoPath, 'utf-8');
                  if (demo && content) content = content.replace('{{demo}}', `<textarea rows="50" cols="">${demo}</textarea>`)
                } catch (err) { }
                return content
              }
            }
          },
          { loader: 'markdown-loader', options: {} }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    global: false
  }
}
