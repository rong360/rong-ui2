export default function doMove (obj, json, time, timingFunction, fn) {
  clearInterval(obj.iTimer);
  var fx = timingFunction || 'linear';
  var d = time || 1000;

  var j = {}

  for (var attr in json) {
    j[attr] = {};
    if (attr == 'opacity') {
      j[attr].b = Math.round(css(obj, attr) * 100);
    } else {
      j[attr].b = parseInt(css(obj, attr));
    }

    j[attr].c = json[attr] - j[attr].b;
  }

  var t1 = +new Date();

  obj.iTimer = setInterval(function () {
    var t = +new Date() - t1;
    if (t >= d) {
      t = d;
    }

    for (var attr in json) {
      var v = Tween[fx](t, j[attr].b, j[attr].c, d);

      if (attr == 'opacity') {
        obj.style.opacity = v / 100;
        obj.style.filter = 'alpha(opacity=' + v + ')';
      } else {
        obj.style[attr] = v + 'px';
      }
    }

    if (t == d) {
      clearInterval(obj.iTimer);
      fn && fn();
    }
  }, 30);
}

function css (obj, attr) {
  if (obj.currentStyle) {
    return obj.currentStyle[attr];
  } else {
    return getComputedStyle(obj, false)[attr];
  }
}

var Tween = {
  linear: function (t, b, c, d) {  // 匀速
    return c * t / d + b;
  }
}
