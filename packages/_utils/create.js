const componentPrefix = 'r'

function createNamespace (name) {
  const prefixName = `${componentPrefix}-${name}` // flex-fixed -> r-flex-fixed
  const prefixCls = `${componentPrefix}--${name.toLowerCase().replace(/-(\w)/g, (_, c) => c)}` // flex-fixed -> r--flexfixed

  return {
    name: prefixName,
    class: prefixCls
  }
}

export {
  createNamespace,
  componentPrefix
}
