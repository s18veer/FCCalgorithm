var canvas = document.createElement("canvas"),
  c = canvas.getContext("2d");
var w = canvas.width = window.innerWidth,
  h = canvas.height = window.innerHeight;
c.fillStyle = "rgba(30,30,30,1)";
c.fillRect(0, 0, w, h);
document.body.appendChild(canvas);

var obb = {
    x: 0,
    y: 0,
  },
  size = 5,
  r = h / 2 - size,
  num = Math.floor(r * Math.PI / 2*size),
  arr = [],
  t = 0;

function draw() {
  t += 0.01;
  for (i = 0; i < num; i++) {
    r1 = Math.abs(r * Math.cos(t+(Math.random()*Math.cos(t))));
    obb = {
      x: r1 * Math.cos(2 * Math.PI / ((num) / (i))) + w / 2,
      y: r1 * Math.sin(2 * Math.PI / ((num) / (i))) + h / 2,
      color: "rgba(" + Math.floor(Math.random() * 0 + 100) + ",200,255,1)"
    };
    arr.push(obb);
    if (arr.length > num) {
      arr.splice(0, num);
    }
  }

  c.beginPath();
  for (i = 0; i < num; i++) {
    c.strokeStyle = arr[i].color;
    c.lineJoin = "round";
    c.lineTo(Math.random() * 20 - 10 + arr[i].x, Math.random() * 20 - 10 + arr[i].y, size, 0, 2 * Math.PI);

    c.lineWidth = "1";
  }
  c.closePath();
  c.stroke();

  c.beginPath();
  for (i = 0; i < num; i++) {
    c.strokeStyle = "rgba(255,255,255,0.75)";
    c.lineJoin = "round";
    c.lineTo(Math.random() * 10 - 5 + arr[i].x, Math.random() * 10 - 5 + arr[i].y, size, 0, 2 * Math.PI);

    c.lineWidth = "1";
  }
  c.closePath();
  c.stroke();
  
  c.beginPath();
  for (i = 0; i < num; i++) {
    c.strokeStyle = "rgba(0,0,0,0.1)";
    c.lineJoin = "round";
    c.lineTo(Math.random() * 10 - 5 + arr[i].x, Math.random() * 10 - 5 + arr[i].y, size, 0, 2 * Math.PI);

    c.lineWidth = "1";
  }
  c.closePath();
  c.stroke();

  for (i = 0; i < num; i++) {
    c.beginPath();
    c.arc(arr[i].x, arr[i].y, size, 0, 2 * Math.PI);
    c.fillStyle = "hsla(" + Math.floor(3.6 * i) + ",100%,100%,0.5)";
    c.fill();
  }

}

window.requestAnimFrame = (function() {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

function loop() {

  setTimeout(function() {
    window.requestAnimFrame(loop);
    c.fillStyle = "rgba(30,30,30,0.5)";
    c.fillRect(0, 0, w, h);
    draw();
  }, 1000 / 60);

}

window.addEventListener('resize', function() {
  w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;
  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
});

loop();
