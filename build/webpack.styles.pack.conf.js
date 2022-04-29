'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob')
const fse = require('fs-extra')
const fs = require('fs')

const env = require('../config/prod.env')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

class CopyLess {
  apply (compiler) {
    compiler.plugin('emit', function (compilation, callback) {
      console.log(Object.keys(compilation))

      // merge css
      let cssStr = ''
      for (let key in compilation.assets) {
        if (/index.css$/.test(key)) {
          cssStr += compilation.assets[key].source()
          fse.outputFile(`${config.pack.styles.assetsRoot}/${key.replace('index.css', 'index.js')}`, `import './index.less';\n`)
          fse.outputFile(`${config.pack.styles.assetsRoot}/${key.replace('index.css', 'css.js')}`, `"use strict";\nrequire("./index.css");\n`)
        }
      }
      fse.outputFile(config.pack.styles.assetsRoot + '/dist/rong-ui2.min.css', cssStr)
      callback()
    });
  }
}

let entry = {};
/**
 * 动态查找所有入口文件
 */
console.log('--- search components css ---')
let files = glob.sync('./src/[!_]*/style/index.less');
files.forEach(f => {
  console.log(f)
  var ret = f.match(/src\/(\S*index)\.less/)
  if (ret) {
    let name = ret[1]
    entry[name] = f
  }
})
console.log('----- webpackEntry -----', entry)

baseWebpackConfig.entry = entry
console.log(baseWebpackConfig.entry)

const webpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true
    })
  },
  devtool: config.build.productionSourceMap ? config.build.devtool : false,
  output: {
    path: config.pack.styles.assetsRoot,
    filename: '[name].css'
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: '[name].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`,
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: false
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    new CopyLess(),
    // copy less
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src'),
        to: config.pack.styles.assetsRoot,
        ignore: ['*.vue', '*.js', '.DS_Store']
      }
    ])
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

// webpackConfig.plugins.push(function() {
//   this.plugin('done', function(stats) {
//     const filterFunc = (src, dest, df) => {
//       // your logic here
//       // it will be copied if return true
//       console.log('0----src--', src, dest)
//       return /\.(less|scss)$/.test(src)
//     }

//     // fse.copy(resolve('src'), config.pack.styles.assetsRoot, { filter: filterFunc }, err => {
//     //   if (err) return console.error(err)
//     //   console.log('success!')
//     // })
//     console.log('=======--')
//     let files = glob.sync(config.pack.styles.assetsRoot + '/[!_]*/style/index.less');
//     console.log('=======', files)
//     // files.forEach(f => {
//     //   console.log(`${config.pack.styles.assetsRoot}/${f}`)
//     //   // fse.outputFile(`${config.pack.styles.assetsRoot}/${key.replace('index.css', 'index.js')}`, `import './index.less';\n`)
//     // })
//   });
// })

module.exports = webpackConfig
