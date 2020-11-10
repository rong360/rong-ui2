export default function startMove (obj, json, times, fx, fn, step) {
  if (typeof times == 'undefined') {
    times = 400;
    fx = 'linear';
  }

  if (typeof times == 'string') {
    if (typeof fx == 'function') {
      fn = fx;
    }
    fx = times;
    times = 400;
  } else if (typeof times == 'function') {
    fn = times;
    times = 400;
    fx = 'linear';
  } else if (typeof times == 'number') {
    if (typeof fx == 'function') {
      fn = fx;
      fx = 'linear';
    } else if (typeof fx == 'undefined') {
      fx = 'linear';
    }
  }

  var iCur = {};

  for (var attr in json) {
    iCur[attr] = 0;
    if (attr == 'opacity') {
      iCur[attr] = Math.round(getStyle(obj, attr) * 100);
    } else if (attr == 'rotate') {
      let matrixStr = getStyle(obj, 'transform') || "";
      let matrixArr = matrixStr.match(/-?\d+(\.\d+)?/g) || [];
      let a = matrixArr[0] || 1;
      let b = matrixArr[1] || 0;
      let c = matrixArr[2] || 0;
      let d = matrixArr[3] || 1;
      iCur[attr] = getRotate(a, b, c, d);
    } else if (attr == 'translateX') {
      let matrixStr = getStyle(obj, 'transform') || "";
      let matrixArr = matrixStr.match(/-?\d+(\.\d+)?/g) || [];
      let translateX = matrixArr[4] || 0;
      iCur[attr] = translateX * 1
    } else {
      iCur[attr] = parseInt(getStyle(obj, attr));
    }
  }

  var startTime = now();

  clearInterval(obj.timer);

  obj.timer = setInterval(function () {
    var changeTime = now();

    var t = times - Math.max(0, startTime - changeTime + times);  // 0到2000

    for (var attr in json) {
      var value = Tween[fx](t, iCur[attr], json[attr] - iCur[attr], times);

      if (attr == 'opacity') {
        obj.style.opacity = value / 100;
        obj.style.filter = 'alpha(opacity=' + value + ')';
      } else if (attr == 'rotate') {
        obj.style.transform = "rotate(" + value + "deg)";
      } else if (attr == 'translateX') {
        console.log(value)
        obj.style.transform = "translateX(" + value + "px)";
      } else {
        obj.style[attr] = value + 'px';
      }
    }
    step && step(value / json['rotate']);
    if (t == times) {
      clearInterval(obj.timer);
      if (fn) {
        fn.call(obj);
      }
    }
  }, 13);

  function getStyle (obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr];
    } else {
      return getComputedStyle(obj, false)[attr];
    }
  }

  function now () {
    return (new Date()).getTime();
  }
}

var Tween = {
  linear: function (t, b, c, d) {  // 匀速
    return c * t / d + b;
  }
}

function getRotate (a, b, c, d) {
  var aa = Math.round(180 * Math.asin(a) / Math.PI);
  var bb = Math.round(180 * Math.acos(b) / Math.PI);
  var cc = Math.round(180 * Math.asin(c) / Math.PI);
  var dd = Math.round(180 * Math.acos(d) / Math.PI);
  var deg = 0;
  if (aa == bb || -aa == bb) {
    deg = dd;
  } else if (-aa + bb == 180) {
    deg = 180 + cc;
  } else if (aa + bb == 180) {
    deg = 360 - cc || 360 - dd;
  }
  return deg >= 360 ? 0 : deg;
  // return (aa+','+bb+','+cc+','+dd);
}
