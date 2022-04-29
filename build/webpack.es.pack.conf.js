'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const productionSourceMap = false
const glob = require('glob')
const vueLoaderConfig = require('./vue-loader.conf')

let entry = {}
/**
 * 动态查找所有入口文件
 */
console.log('--- search components ---');

const files = glob.sync('./src/**/*.js');

files.forEach(f => {
  let name = f.split('/src/')[1]
  if (name) {
    entry[name] = f
  }
})

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

// module.exports = {
//   context: path.resolve(__dirname, '../'),
//   entry: {
//     'button/index.js': './src/button/index.js'
//   },
//   mode: 'production',
//   output: {
//     path: config.build.assetsRoot,
//     filename: '[name]',
//     libraryTarget: 'module'
//   },
//   resolve: {
//     extensions: ['.js', '.vue', '.json'],
//     alias: {
//       'vue$': 'vue/dist/vue.esm.js',
//       '@': resolve('src')
//     }
//   },
//   experiments: {
//     outputModule: true
//   },
//   module: {
//     rules: [
//       {
//         test: /\.vue$/,
//         loader: 'vue-loader',
//         options: vueLoaderConfig
//       },
//       {
//         test: /\.js$/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               ["@babel/preset-env", {
//                 modules: false,
//                 useBuiltIns: 'usage',
//                 targets: { esmodules: true }
//               }]
//             ],
//             plugins: [
//               "@babel/plugin-proposal-object-rest-spread",
//               "@babel/plugin-transform-classes",
//               "@babel/plugin-transform-runtime"
//             ],
//             comments: false

//           }
//         },
//         include: [resolve('src')]
//       }
//     ]
//   },
//   node: {
//     global: false
//   }
// }
baseWebpackConfig.entry = {
  'button/index.js': './src/button/index.js'
}
const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: productionSourceMap ? '#source-map' : false,
  experiments: {
    outputModule: true
  },
  output: {
    path: config.pack.es.assetsRoot,
    filename: '[name]',
    library: {
      type: 'module'
    }
  },
  plugins: [
    // new webpack.BannerPlugin({ banner: banner, raw: true, entryOnly: true }),
    // new CopyWebpackPlugin({
    //   patterns: [{
    //     from: path.resolve(__dirname, '../static'),
    //     to: config.dev.assetsSubDirectory,
    //     globOptions: {
    //       dot: true,
    //       gitignore: true,
    //       ignore: ['.*'],
    //     }
    //   }]
    // })
  ]
})

module.exports = webpackConfig
