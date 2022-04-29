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

let banner =
  '/*!\n' +
  ' * RONG UI v' + packageJson.version + ' (http://gitlab.rong360.com/RFE/rong-ui2)\n' +
  ' * (c) ' + new Date().getFullYear() + ' Rong360 FE Team \n' +
  ' * Released under the MIT License.\n' +
  ' */';

let entry = {
  [`${packageJson.name}.js`]: {
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

const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
const files = glob.sync('./packages/[!_]*/index.js');

files.forEach(f => {
  let name = f.split('/packages/')[1]
  let componentFolder = f.match(/packages\/(.+)\/index.js/)
  if (name) {
    entry[name] = {
      import: f,
      library: {
        name: camelize(`-r-${componentFolder[1]}`), // RFlexFixed
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
