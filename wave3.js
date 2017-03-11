var canvas = document.getElementById('surface');
var ctx = canvas.getContext("2d");

var dbg = document.getElementById('debug');

var points = [];

var offset = 0;

setInterval(preRender, 100);

function preRender() {
  offset += 1;
  ctx.clearRect(0,0,500,500);  
  
  render(offset * 5, 1.2, 720);
  render(7 + offset * 3, 1.8, 580);
  render(offset * 4, 1.3, 840);
  render(offset * 8, 2.6, 380);
}

function render(ofs, mult, max) {
  var x = [0];
  var y = [250];
  var a = 0;
  
  var wid = 10;
  
  for (i = 1; i < max; i ++) {
    x.push(1*i);
    var q = i/50;
    y.push(Math.cos((-(i*mult)+ofs) * (Math.PI / 180)) * (q*q) );
    a = 1 - (i/(max * .7));
    
    ctx.strokeStyle = 'rgba(0,0,0,' + a + ')';
    ctx.lineWidth = wid * a;
    ctx.beginPath();
    ctx.moveTo(x[0], 250 + y[0]);
    ctx.lineTo(x[1], 250 + y[1]);
    ctx.stroke();
    ctx.closePath();
    
    x.shift();
    y.shift();
  }
}
