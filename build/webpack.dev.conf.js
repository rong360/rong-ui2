'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
// const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const fs = require('fs')
const isDebug = process.argv.some(arg => arg.indexOf('debug') > -1)
const isRelease = process.argv.some(arg => arg.indexOf('release') > -1)

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    // clientLogLevel: 'warning', // v4 移动到了client下面 改名logging 'warn'
    client: {
      logging: 'warn',
      overlay: config.dev.errorOverlay
        ? { warnings: false, errors: true }
        : false,
      progress: true
    },
    static: false,
    devMiddleware: {
      publicPath: config.dev.assetsPublicPath
    },
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
      ]
    },
    hot: true,
    // contentBase: false,   // v4移动到了static下面
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    // overlay: config.dev.errorOverlay
    //   ? { warnings: false, errors: true }   // v4 移动到了client下面
    //   : false,
    // publicPath: config.dev.assetsPublicPath, // v4 移动到了devMiddleware下面
    proxy: process.env.PROXY === 'true' ? config.dev.proxyTable : {},
    // quiet: true, // v4移除了该选项
    // watchOptions: {
    //   poll: config.dev.poll,   // v4移动到了static下面的watch
    // },
    // disableHostCheck: true // v4移除了该选项
    allowedHosts: "all"
  },
  target: 'web',
  optimization: {
    moduleIds: 'named' // webpack5 采用此方式代替 NamedModulesPlugin
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      chunks: ['app'],
      template: path.resolve(__dirname, '../src/doc.html'),
      inject: 'body',
      scriptLoading: 'blocking',
      minify: {
        removeComments: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'demo.html',
      chunks: ['demo'],
      template: path.resolve(__dirname, '../src/demo.html'),
      inject: 'body',
      scriptLoading: 'blocking',
      minify: {
        removeComments: true
      }
    })
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [
            `you are testing -> ${isRelease ? 'release 包' : 'src 源文件'}`,
            `Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`
          ]
        },
        onErrors: config.dev.notifyOnErrors
          ? utils.createNotifierCallback()
          : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
