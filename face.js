'use strict';

var contour = document.querySelectorAll('[class*="contour"]');
function sceneTwo() {
  var tl = new TimelineLite();
  tl.from(contour, 1.5, {
    scale: .9,
    transformOrigin: "70% 80%",
    fill: '#000fff'

  }, 'face');
  return tl;
}
sceneTwo();
