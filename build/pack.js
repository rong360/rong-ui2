'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const spinner = ora('building for production...')
const isDebug = process.argv.some(arg => arg.indexOf('debug') > -1)
spinner.start()

let pack = {
  assetsRoot: null,
  webpackConfig: null,
  method: null
}

if (process.argv.some(arg => arg.indexOf('lib') > -1)) {
  Object.assign(pack, {
    assetsRoot: config.pack.lib.assetsRoot,
    webpackConfig: require('./webpack.lib.pack.conf'),
    method: 'lib'
  })
}

if (process.argv.some(arg => arg.indexOf('es') > -1)) {
  Object.assign(pack, {
    assetsRoot: config.pack.lib.assetsRoot,
    webpackConfig: require('./webpack.es.pack.conf'),
    method: 'es'
  })
}

rm(path.join(pack.assetsRoot), err => {
  if (err) throw err
  webpack(pack.webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red(`  Build ${pack.method} failed with errors.\n`))
      process.exit(1)
    }

    console.log(chalk.cyan(`  Build ${pack.method} complete.\n`))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
