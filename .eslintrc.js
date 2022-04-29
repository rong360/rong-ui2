// ESlint 检查配置
module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: [
    "standard",
    "plugin:vue/essential"],

  "plugins": [
    "vue"
  ],

  // add your custom rules here
  // it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "quotes": 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'semi': 0,
    "eqeqeq": 0 ,
    "one-var":0,
    "template-curly-spacing": 0,
    "no-mixed-operators": 0,
    "node/no-callback-literal": 0,
    "prefer-const": 0,
    "quote-props": 0,
    "vue/no-side-effects-in-computed-properties": 0,
    "vue/multi-word-component-names": 0
  }
}
