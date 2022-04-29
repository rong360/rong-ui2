import { camelize } from "./format";
import { componentPrefix } from './create'

function withInstall (options, callback) {
  const install = (Vue) => {
    const { name } = options;
    // 新版加前缀的PaseCase格式注册，如 RButton、RFlexfixed、RSelectdate、RScrollarea等
    const prefixName = name.replace(new RegExp("^(" + componentPrefix + '-)(.+)'), (_, c1, c2) => c1 + c2.toLowerCase().replace(/-(\w)/g, (_, c1) => c1))
    Vue.component(camelize(`-${prefixName}`), options);
    console.log(camelize(`-${prefixName}`))

    // 兼容旧版无前缀的PaseCase格式注册，如 Button、FlexFixed、ScrollArea等
    const nameNoPrefix = name.replace(new RegExp("^" + componentPrefix + '-'), '')
    if (!/(switch)/.test(nameNoPrefix)) {
      Vue.component(camelize(`-${nameNoPrefix}`), options);
    }

    callback && callback({ Vue })
  }
  options.install = install

  if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  return options
}

export {
  withInstall
}
