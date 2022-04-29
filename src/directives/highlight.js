import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css'

const install = function (Vue) {
  Vue.directive('hljs', el => {
    let blocks = el.querySelectorAll('pre code');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
}

export default install
