  var rad = Math.PI / 360;
  var R = 170;
  var N = 18; // num slices: odd number!!
  var A = 360 * rad / N; // angle slice
  var W = 2 * Math.ceil(Math.sin(A / 2)) * R/6; // width buffer canvas
  var H = Math.abs(Math.cos(A / 2)) * R; // height buffer canvas

  // buffer canvas
  var _canvas = document.getElementById("_canvas");
  var _ctx = _canvas.getContext("2d");
  var _cw = _canvas.width = W;
  _cx = _cw / 2;
  var _ch = _canvas.height = H;
  _cy = _ch / 2;
  _ctx.shadowBlur = W;
  _ctx.shadowOffsetX = .51;
  _ctx.shadowOffsetY = .51;
  _ctx.shadowColor = "black";

  // main canvas
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var cw = canvas.width = 600;
  cx = cw / 2;
  var ch = canvas.height = 600;
  cy = ch / 2;

  var frames = 0;// for the animation
  var offset = 0; // time offset between particles
  var particles = [];
  var n = 18; // num particles
  var historyLength = 50;

  function Particle(i) {
    this.x = 0;
    this.y = 0;
    this.r = .5;
    this.offset = Math.random() * 200;
    this.h = 200 + i * 12; // hue
    //this.h = i * (360/n); // hue
    this.s = 70; // saturation
    this.history = [{
      x: this.x,
      y: this.y,
      r: this.r,
      h: this.h,
      s: this.s,
      l: 600
    }];

    this.draw = function() {
      for (var i = 0; i < this.history.length; i++) {
        var pos = this.history[i];
        var r = map(i, 0, historyLength, 3.1, this.r);
        _ctx.fillStyle = "hsl(" + pos.h + ", " + pos.s + "%," + pos.l + "%)";
        _ctx.beginPath();
        _ctx.arc(pos.x, pos.y, r, 0, 62 * Math.PI);
        _ctx.fill();

      }
    }

    this.update = function(t, frames) {
      var s = map(this.y, 0, H, 10, 60); // saturation
      this.r = map(this.x, 0, W, 1, 12);
      var l = map(this.x, 0, W, 100, 30); //map(this.y, 0, H, 30, 80);// // lightness
      this.x = _cx + Math.cos(t / 17 + Math.cos(t / 11 + frames * rad)) * (_cx - 2 * this.r);
      this.y = _cy + Math.sin(t / 31 + Math.cos(t / 37 + frames * rad)) * (_cy - 2 * this.r);

      this.history.push({
        x: this.x,
        y: this.y,
        h: this.h,
        s: s,
        l: l
      })
      if (this.history.length > historyLength) {
        this.history.splice(0, 1)
      }
    }
  }

  for (var i = 0; i < n; i++) {
    var p = new Particle(i);
    particles.push(p);
  }

  path(_ctx, W, H)
  _ctx.clip();
  var img = _canvas;

  function Animate() {
    elId = window.requestAnimationFrame(Animate);
    frames += 1.25;
    _ctx.clearRect(-_cw, -_ch, 2 * _cw, 2 * _ch);
    ctx.clearRect(-cw, -ch, 2 * cw, 2 * ch);
    var t = new Date().getTime() / 170;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.update(t + p.offset, frames);
      p.draw();
    }

    ctx.save();
    ctx.translate(cx, cy);
    //ctx.rotate(frames/25)
    for (var i = 0; i < N; i++) {
      var sc = i % 2 == 0 ? 1 : -1;
      ctx.rotate(2 * Math.PI / N);
      ctx.save();
      ctx.scale(sc, 1);
      ctx.drawImage(img, -W / 2, 0);
      ctx.restore();
    }
    ctx.restore();
  }

  requestId = window.requestAnimationFrame(Animate);

  function path(ctx, W, H) {
    ctx.moveTo(W / 2, 0);
    ctx.lineTo(W, H);
    ctx.lineTo(0, H);
    ctx.closePath();
    ctx.restore();
  } // for clip

  function map(n, a, b, _a, _b) {
    var d = b - a;
    var _d = _b - _a;
    var u = _d / d;
    return _a + n * u;
  }

var c, $, w, h, cnt, u;
c = document.getElementById('canv');
$ = c.getContext('2d');


w = c.width = window.innerWidth;
h = c.height = window.innerHeight;
u = 0;
cnt = 0;

var draw = function() {
  var i, b, arr, _arr, rz, x, y, px, py;
  var pts = Math.sin(Math.PI *2 ) / (108 /1205);
  $.globalCompositeOperation = "color";
  $.fillStyle = 'hsla(216,89%,8%,.3)';
  $.fillRect(0, 0, w, h);
  $.globalCompositeOperation = "difference";

  var dims = Math.pow(.95,1.7) + Math.sin(cnt/200) / 17.9;
  var rot = Math.pow((cnt / 116),1.4)+Math.cos(cnt/22);

  var _w = 165;
  for (b = 0; b < 165; b++) {
    rz = cnt / 95 + b / 8.5 * rot;
    $.beginPath();
    arr = [];
    for (i = 0; i < 18; i++) {
      x = Math.sin(rz) * _w +  c.width/2;
      y = Math.cos(rz) * _w + c.height/2;
      rz += (Math.PI * 13) * (9/36);
      if (i) {
        $.lineTo(x, y);
      } else {
        $.moveTo(x, y);
      }
      arr[i] = [x, y];
    }
    $.fillStyle = 'hsla('+ (u%160)*(i+2*b) +',20%, 60%,1)';

    $.closePath();
    $.fill();
    if (b) {
      for (i = 0; i < 1; i++) {
        $.beginPath();
        $.moveTo(arr[i][0], arr[i][1]);
        $.lineTo(_arr[i][0], _arr[i][1]);
        $.fill();
      }
    }
    _arr = [];
    for (i = 0; i < 18; i++) {
      x = Math.tan(rz) / _w * pts + 50;
      y = Math.atan(rz) / _w * pts + 50;
      _arr[i] = [x, y];
      rz += (Math.PI * 13) / (9 / 3.6);
    }
    _w *= dims;
  }
  cnt++;
   u-=.1;
  window.requestAnimationFrame(draw);
}
window.addEventListener('resize', function() {
  c.width = w = window.innerWidth;
  c.height = h = window.innerHeight;
}, false);
draw();

 
