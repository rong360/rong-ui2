const componentPrefix = 'r'

function genBem (name, mods) {
  if (!mods) return ''

  if (typeof mods == 'string') return ` ${name}--${mods}`

  if (Array.isArray(mods)) {
    return mods.reduce((ret, item) => ret + genBem(name, item), '')
  }

  return Object.keys(mods).reduce(
    (ret, key) => ret + (mods[key] ? genBem(name, key) : ''),
    ''
  );
}

/**
 * CSS-BEM 命名规范: block-name__element-name--modifier-name，也就是模块名 + 元素名 + 修饰器名。
 *
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
function createBEM (name) {
  return (el, mods) => {
    if (el && typeof el !== 'string') {
      mods = el
      el = ''
    }
    el = el ? `${name}__${el}` : name
    return `${el}${genBem(el, mods)}`;
  }
}

function createNamespace (name) {
  const prefixName = `${componentPrefix}-${name}` // flex-fixed -> r-flex-fixed
  const prefixCls = `${componentPrefix}-${name.toLowerCase().replace(/-(\w)/g, (_, c) => c)}` // flex-fixed -> r--flexfixed

  return {
    name: prefixName,
    class: prefixCls,
    bem: createBEM(prefixCls)
  }
}

export {
  createNamespace,
  componentPrefix
}
