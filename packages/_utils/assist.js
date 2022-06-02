// 判断参数是否是其中之一
export function oneOf (value, validList) {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}

/**
 * context 是通过require('./components/LoadingCattle.vue'）等导入
 * 导出组件选项对象
 */
export function getComponentContext (context) {
  let component = null
  if (context && (context.render || context.template)) {
    component = context
  } else if (context && context.default && context.default.render) {
    component = context.default
  } else if (typeof context === 'function') {
    component = {
      render: context
    }
  }
  return component
}
