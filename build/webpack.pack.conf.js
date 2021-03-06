'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const productionSourceMap = false
var packageJson = require('../package.json')

let banner =
      '/*!\n' +
      ' * RONG UI v' + packageJson.version + ' (http://gitlab.rong360.com/RFE/rong-ui2)\n' +
      ' * (c) ' + new Date().getFullYear() + ' Rong360 FE Team \n' +
      ' * Released under the MIT License.\n' +
      ' */';

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: productionSourceMap ? '#source-map' : false,
  entry: {
    app: ['./src/utils/pollyfill.js', './src/index.js']
  },
  output: {
    path: path.resolve(__dirname, '../dist/'),
    filename: 'js/rong-ui.js',
    chunkFilename: 'js/rong-ui.js',
    library: 'rong-ui2',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: 'styles/rong-ui.css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: false
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new webpack.BannerPlugin({banner: banner, raw: true, entryOnly: true}),
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
})

module.exports = webpackConfig
