// var bg = [255, 153, 0]
var bg = [0, 0, 0]
var canvas = document.createElement('canvas')
var canvas2 = document.createElement('canvas')
document.getElementsByTagName('body')[0].appendChild(canvas2)
document.getElementsByTagName('body')[0].appendChild(canvas)
document.getElementsByTagName('body')[0].style['background-color'] = `rgb(${bg[0]},${bg[1]},${bg[2]})`
canvas.style.opacity = 0

canvas2.width = canvas.width = 640;
canvas2.height = canvas.height = 640;

var ctx = canvas.getContext('2d');
var ctx2 = canvas2.getContext('2d');
var image = ctx.createImageData(canvas.width, canvas.height);
var data = image.data;
noise.seed(Math.random());

for (var x = 0; x < canvas.width; x ++) {
  for (var y = 0; y < canvas.height; y ++) {
    var value = Math.abs(noise.simplex2(x / 245, y / 245));
    // var value1 = Math.abs(noise.simplex2(x / 183, y / 183));
    value = value * 256
    // value = (value * value1) * 256 * 3 //* 7// * (Math.random()*0.4 + 0.1);
    var cell = (x + y * canvas.width) * 4;
    data[cell] = data[cell + 1] = data[cell + 2] = value;
    // data[cell] += Math.max(0, (25 - value) * 8);
    data[cell + 3] = 256; // alpha.
  }
}
ctx.putImageData(image, 0, 0)

fade(ctx2, 1)

function Traveler () {
  this.step = Math.round(Math.random()*40)
  this.x = 0
  this.y = 0
  this.vx = 0
  this.vy = 0
  this.ao = Math.random() * 50 // Math.PI * 2 * 
  this.s = 2
  this.r = 2// + Math.random() * 6 * Math.random()
  this.update = function () {
    this.step ++
    this.step %= 360
    this.ao += 1
    this.ao %= 360
    var x = this.x
    var y = this.y
    
    var x0 = canvas.width / 2 - this.x
    var y0 = canvas.height / 2 - this.y
    var a0 = Math.atan2(y0, x0)
    var d0 = Math.pow(x0 * x0 + y0 * y0, 1/2)
      
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height || Math.abs(d0) > canvas.width/2) {
      this.x = Math.random() * canvas.width 
      this.y = Math.random() * canvas.height 
    } else {
      var a = getColor(this.x, this.y) * Math.PI * 2 + this.ao / 360 * Math.PI * 2
      vx = Math.cos(a) * this.s 
      vy = Math.sin(a) * this.s 
      this.vx = vx * 0.55 + this.vx * 0.45
      this.vy = vy * 0.55 + this.vy * 0.45
      this.x = this.vx + this.x
      this.y = this.vy + this.y

      var c = Math.sin(this.step / 180 * Math.PI) * 50 + 340
      ctx2.strokeStyle = `hsla(${c}, ${95}%, ${50}%, 0.8)`

      ctx2.beginPath()
      ctx2.lineCap = "round"

      var x1 = canvas.width / 2 - this.x
      var y1 = canvas.height / 2 - this.y
      var a1 = Math.atan2(y1, x1)
      var d1 = Math.pow(x1 * x1 + y1 * y1, 1/2)
      for (var i = 0; i < 12; i++) {
        var ai = Math.PI * 2 / 12 * i //+ this.step/180*Math.PI/5
        if(i%2 === 0){
          var ax0 = Math.cos(-a0 + ai) * d0
          var ay0 = Math.sin(-a0 + ai) * d0
          var ax1 = Math.cos(-a1 + ai) * d1
          var ay1 = Math.sin(-a1 + ai) * d1
        } else {
          var ax0 = Math.cos(a0 + ai) * d0
          var ay0 = Math.sin(a0 + ai) * d0
          var ax1 = Math.cos(a1 + ai) * d1
          var ay1 = Math.sin(a1 + ai) * d1
        }

        ctx2.beginPath()
        ctx2.lineWidth = 1.2
        // ctx2.lineWidth = Math.min(canvas.width * 0.5/(canvas.width * 0.5 - d0), 5) + 0.2
        ctx2.moveTo(ax0 + canvas.width / 2, ay0 + canvas.height / 2)
        ctx2.lineTo(ax1 + canvas.width / 2, ay1 + canvas.height / 2)
        ctx2.stroke();
      }
    }
    
  }
  
} 

function getColor (x, y) {
  var col = ctx.getImageData(x, y, 1, 1).data
  return col[0] / 255 * col[1] / 255 * col[3] / 255
}


var travelers = []

for(var i = 0; i < 100; i++){
  var t = new Traveler()
  t.x = Math.random() * canvas.width
  t.y = Math.random() * canvas.height
  travelers.push(t)
}

setInterval(animate, 40)

function animate() {
  fade(ctx2, 0.05)
  for(var i = 0; i < travelers.length; i++) {
    var t = travelers[i]
    t.update()
  }
}

function fade(ctx, amt) {
  ctx.beginPath();
  ctx.rect(0, 0, canvas2.width, canvas2.height)
  ctx.fillStyle = `rgba(${bg[0]}, ${bg[1]}, ${bg[2]}, ${amt})`
  ctx.fill()
}
