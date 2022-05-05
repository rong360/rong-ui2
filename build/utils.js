'use strict'
const path = require('path')
const config = require('../config')
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // js中的css文件提取出来，生成单独的文件
const packageConfig = require('../package.json')

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // const postcssLoader = {
  //   loader: 'postcss-loader',
  //   options: {
  //     sourceMap: options.sourceMap,
  //     postcssOptions: loaderContext => {
  //       if (/\/packages\/|demo.less$/.test(loaderContext.resourcePath)) {
  //         return {
  //           ident: 'postcss',
  //           plugins: [
  //             require('postcss-plugin-px2rem')({
  //               // base on 320px standard.
  //               rootValue: 18.75,
  //               // to leave 1px alone.
  //               minPixelValue: 1.01
  //             })
  //           ]
  //         }
  //       } else {
  //         return {}
  //       }
  //     }
  //   }
  // }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
      postcssOptions: loaderContext => {
        return {
          ident: 'postcss',
          plugins: [
            require('postcss-plugin-px2rem')({
              // base on 320px standard.
              rootValue: 18.75,
              // to leave 1px alone.
              minPixelValue: 1.01,
              selectorBlackList: ['.r-doc', '.markdown-body']
            })
          ]
        }
      }
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return [{loader: MiniCssExtractPlugin.loader}].concat(loaders)
    } else {
      return [{loader: 'vue-style-loader'}].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less').concat(/*{
      loader: 'style-resources-loader',
      options: {
        patterns: [path.resolve(__dirname, '../src/_styles/index.less')],
        injector: 'append'
      }
    }*/),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]

    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}
