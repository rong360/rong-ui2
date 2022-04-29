const camelize = (str) => str.replace(/-(\w)/g, (_, c) => c.toUpperCase());

export {
  camelize
}
