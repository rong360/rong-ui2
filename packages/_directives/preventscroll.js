/**
 * v-preventscroll
 * @desc 阻止页面滚动，需要滚动的区域可通过加'.scroll-area'样式实现
 * @example
 * ```vue
 * <div v-preventscroll="handleMove">
 *  <p>test</p>
 *  <div class="scroll-area"></div>
 *  <p>test</p>
 * </div>
 * ```
 */
export default {
  bind (el, binding, vnode) {
    let currentScrollArea = null
    const mouseInfo = {
      startX: 0,
      startY: 0,
      direction: ''
    }
    const searchScrollArea = (el) => {
      let scrollArea = null
      while (el) {
        if (el.className && el.className.indexOf && el.className.indexOf('scroll-area') > -1) {
          scrollArea = el
          break
        }
        el = el.parentNode
      }
      return scrollArea
    }
    const touchstartHandler = (e) => {
      currentScrollArea = searchScrollArea(e.target)
      mouseInfo.startX = e.targetTouches[0].clientX
      mouseInfo.startY = e.targetTouches[0].clientY
    }
    const touchmoveHandler = (e) => {
      mouseInfo.direction = getDirection(mouseInfo.startX, mouseInfo.startY, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
      if (!currentScrollArea || currentScrollArea && ((mouseInfo.direction == 2 && currentScrollArea.scrollTop == 0) || (mouseInfo.direction == 1 && currentScrollArea.scrollTop >= (currentScrollArea.scrollHeight - currentScrollArea.offsetHeight))) && e.cancelable) {
        e.preventDefault();
        e.stopPropagation();
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueTouchstartHandle__ = touchstartHandler
    el.__vueTouchmoveHandle__ = touchmoveHandler
    el.addEventListener('touchstart', el.__vueTouchstartHandle__)
    el.addEventListener('touchmove', el.__vueTouchmoveHandle__)
  },
  update () {

  },
  unbind (el, binding) {
    el.removeEventListener('touchstart', el.__vueTouchstartHandle__)
    el.removeEventListener('touchmove', el.__vueTouchmoveHandle__)
    delete el.__vueTouchstartHandle__
    delete el.__vueTouchmoveHandle__
  }
};

// 获得角度
function getAngle (angx, angy) {
  return Math.atan2(angy, angx) * 180 / Math.PI
}

// 根据起点终 点返回方向 1向上 2向下 3向左 4向右 0未滑动
function getDirection (startx, starty, endx, endy) {
  const angx = endx - startx;
  const angy = endy - starty;
  let result = 0;

  // 如果滑动距离太短
  if (Math.abs(angx) < 5 && Math.abs(angy) < 5) {
    return result
  }
  const angle = getAngle(angx, angy);
  if (angle >= -135 && angle <= -45) {
    result = 1
  } else if (angle > 45 && angle < 135) {
    result = 2
  } else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
    result = 3
  } else if (angle >= -45 && angle <= 45) {
    result = 4
  }
  return result
}
