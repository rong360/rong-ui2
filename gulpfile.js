const gulp = require("gulp")
const babel = require('gulp-babel');
const del = require('del');
const less = require('gulp-less');
const through2 = require('through2')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const concat = require('gulp-concat')
const fse = require('fs-extra')
const config = require('./config')
const packageJson = require('./package.json')

const paths = {
  dest: {
    styles: `${config.pack.styles.assetsRoot}`,
    esmScripts: `${config.pack.es.assetsRoot}` // ES module
  },
  scripts: `./packages/**/*.js` // 脚本文件
}

/**
 * babel编译
 * @param {*} moduleType "amd" | "umd" | "systemjs" | "commonjs" | "cjs" | "auto" | false, defaults to "auto"
 * @returns
 */
function babelConfig (moduleType) {
  moduleType = moduleType === 'esm' ? false : moduleType
  return {
    babelrc: false,
    presets: [
      ["@babel/preset-env", { "modules": moduleType }]
    ],
    plugins: [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-transform-classes"
    ]
  };
}

/**
 * 编译脚本文件
 * @param {*} moduleType 模块类型
 * @param {*} destDir 目标目录
 */
function compileScripts (moduleType, destDir) {
  const { scripts } = paths
  return gulp
    .src(scripts)
    .pipe(babel(babelConfig(moduleType)))
    .pipe(gulp.dest(destDir))
}

/**
 * 编译esm
 */
function compileESM () {
  const { dest } = paths
  return compileScripts('esm', dest.esmScripts)
}

// copy *.vue 等文件到ESM模块
function copyFilesToESM (done) {
  const filterFunc = (src, dest) => {
    let stat = fse.lstatSync(src)

    if (stat.isDirectory()) {
      return src.indexOf('__demo__') < 0
    } else {
      return /\.(vue)$/.test(src)
    }
  }

  fse.copy('./packages', paths.dest.esmScripts, { filter: filterFunc }, err => {
    if (err) return console.error(err)
    console.log(`copy *.vue -> ${paths.dest.esmScripts} success!`)
  })
  done()
}

// index.less -> index.css
function less2css (done) {
  gulp.src('./packages/*/style/index.less')
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.styles))
    .pipe(concat(`${packageJson.name}.css`)) // 合并文件为all.css
    .pipe(gulp.dest(paths.dest.styles)) // 输出all.css文件
  done()
}

// copyLess && add index.js css.js entry
function copyLess (done) {
  gulp.src('./packages/**/*.less')
    .pipe(
      through2.obj(function z (file, encoding, next) {
        let indexJs = file.clone();
        let cssJs = file.clone();
        this.push(file.clone());
        if (file.path.match(/(\/|\\)style(\/|\\)index\.less/)) {
          // add index.js 用于加载.less文件
          indexJs.contents = Buffer.from(`import './index.less';\n`);
          indexJs.path = indexJs.path.replace(/index\.less/, 'index.js');
          this.push(indexJs);

          // add css.js 用于加载.css文件
          cssJs.contents = Buffer.from(`"use strict";\nrequire("./index.css");\n`);
          cssJs.path = cssJs.path.replace(/index\.less/, 'css.js');
          this.push(cssJs);
          next();
        } else {
          next();
        }
      })
    )
  .pipe(gulp.dest(paths.dest.styles))
  done()
}

const cleanStyles = done => del([paths.dest.styles])
const cleanESMScripts = done => del([paths.dest.esmScripts])

// 串行执行编译脚本任务（cjs,esm） 避免环境变量影响
const buildESMScripts = gulp.series(cleanESMScripts, compileESM, copyFilesToESM)

const buildStyles = gulp.series(cleanStyles, less2css, copyLess)

exports.buildStyles = buildStyles
exports.buildESMScripts = buildESMScripts
