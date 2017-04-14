(function() {
  'use strict';

  var width, height, canvas, cxt;

  var masterRadius = 40,
    lineWidth = 0,
    backgroundColor = 'white',
    circleStrokeColor = 'black',
    circleFillColor = 'black',
    recursionLevels = 9,
    scaleFactor = 0.84,
    scaleExponent = 2.3,
    nextSpacing = 3.05,
    angle = Math.PI * 0.191,
    angleIncrement = 0.005;

  width = window.innerWidth;
  height = window.innerHeight;
  canvas = document.getElementById('canvas');
  cxt = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  function drawCircle(x, y, recursionLevel) {
    var radius = masterRadius * scaleFactor * Math.pow((recursionLevel / recursionLevels), scaleExponent),
      xNext = radius * nextSpacing,
      yNext = radius * nextSpacing;

    cxt.save();
    // cxt.shadowColor = 'rgba(255, 0, 0, 1)';
    // cxt.shadowBlur = 5;
    cxt.translate(x, y);
    cxt.strokeStyle = circleStrokeColor;
    cxt.fillStyle = circleFillColor;
    cxt.lineWidth = lineWidth;
    cxt.beginPath();
    cxt.ellipse(0, 0, radius, radius, 0, 2 * Math.PI, 0);
    cxt.stroke();
    cxt.fill();
    cxt.closePath();

    if (recursionLevel > 0) {
      recursionLevel--;
      cxt.rotate(angle);
      drawCircle(xNext, yNext, recursionLevel);
      cxt.rotate(Math.PI);
      drawCircle(xNext, yNext, recursionLevel);
    }
    cxt.restore();
  }

  function fillBackground() {
    cxt.beginPath();
    cxt.fillStyle = backgroundColor;
    cxt.rect(0, 0, canvas.width, canvas.height);
    cxt.fill();
    cxt.closePath();
  }

  function draw() {
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    fillBackground();
    angle += angleIncrement;
    cxt.save();
    cxt.translate(width / 2 + 0.5, height / 2 + 0.5);
    drawCircle(0, 0, recursionLevels);
    cxt.restore();
    requestAnimationFrame(draw);
  }

  draw();
})();
