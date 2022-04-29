'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const { merge } = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // js中的css文件提取出来，生成单独的文件
const TerserWebpackPlugin = require('terser-webpack-plugin');  //如果你使用的是 webpack v5 或以上版本，你不需要安装这个插件。webpack v5 自带最新的 terser-webpack-plugin。如果使用 webpack v4，则必须安装 terser-webpack-plugin v4 的版本。
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')

const env = require('../config/prod.env')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].js?t=[chunkhash:7]'),
    chunkFilename: utils.assetsPath('js/[name].js?t=[chunkhash:7]')
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin(), // Webpack5自带了开箱即用的代码压缩插件，官方推荐
      new CssMinimizerWebpackPlugin() // 压缩css代码
    ],
    runtimeChunk: { name: 'runtime' },
    concatenateModules: true,
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
          priority: -10
        },
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors'
        }
      }
    },
    moduleIds: 'deterministic'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
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
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].css?t=[contenthash:7]'),
      chunkFilename: utils.assetsPath('css/[name].css?t=[contenthash:7]')
    })
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: path.resolve(__dirname, '../static'),
    //       to: config.build.assetsSubDirectory,
    //       globOptions: {
    //         dot: true,
    //         gitignore: true,
    //         ignore: ['.*']
    //       }
    //     }
    //   ]
    // })
  ]
})

if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
