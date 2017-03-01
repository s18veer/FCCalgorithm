'use strict';

var contour = document.querySelectorAll('[class*="contour"]');
function sceneTwo() {
  var tl = new TimelineLite();
  tl.from(contour, 1.5, {
    scale: .9,
    transformOrigin: "50% 50%",
    fill: '#000000'

  }, 'face');
  return tl;
}
sceneTwo();
