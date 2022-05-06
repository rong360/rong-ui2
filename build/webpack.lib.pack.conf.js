'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const productionSourceMap = false
const glob = require('glob')
const packageJson = require('../package.json')
const TerserPlugin = require("terser-webpack-plugin");

let banner =
  '/*!\n' +
  ' * RONG UI v' + packageJson.version + ' (http://gitlab.rong360.com/RFE/rong-ui2)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Rong360 FE Team \n' +
  ' * Released under the MIT License.\n' +
  ' */';

let entry = {
  'index.js': {
    import: './packages/index.js',
    library: {
      name: "RongUi2",
      type: 'umd',
      umdNamedDefine: true,
      export: 'default'
    }
  }
}
/**
 * 动态查找所有入口文件
 */
console.log('--- search components ---');

const files = glob.sync('./packages/[!_]*/index.js');

files.forEach(f => {
  let name = f.split('/packages/')[1]
  let componentFolder = f.match(/packages\/(.+)\/index.js/)
  if (name) {
    entry[name] = {
      import: f,
      library: {
        name: `R${componentFolder[1].replace(/(\w)(.+)/g, (_, c1, c2) => c1.toUpperCase() + c2.toLowerCase().replace('-', ''))}`, // RFlexfixed
        type: 'umd',
        umdNamedDefine: true,
        export: 'default'
      }
    }
  }
})

baseWebpackConfig.entry = entry

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
  output: {
    path: config.pack.lib.assetsRoot,
    filename: '[name]'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false // 不将注释提取到单独的文件中
      })
    ]
  },
  plugins: [
    new webpack.BannerPlugin({ banner: banner, raw: true, entryOnly: true })
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
