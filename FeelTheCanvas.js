const lineColor = '#50c5b7';

var W = window.innerWidth * 2
var H = window.innerHeight * 2

const canvas = document.createElement('canvas')
canvas.width = W
canvas.height = H
document.body.appendChild(canvas)


const ctx = canvas.getContext('2d')

const start = {
  x: 10, y: 10,
  cx: 10 + W / 2, cy: 10
}
const end = {
  x: W - 10,
  y: H - 10,
  cx: (W - 10) - W / 2,
  cy: H - 10
}

function r(p, amount) {
  amount = amount || 100
  return p + Math.random() * amount * 2 - amount;
}

window.addEventListener('mousemove', (e) => {
  end.x = e.clientX * 2
  end.y = e.clientY * 2
})

function drawWithPhase(phase) {
  start.x = (Math.cos(Date.now() / 800 + phase) * 0.5 + 0.5) * W
    start.y = (Math.sin(Date.now() / 1000 + phase) * 0.5) * H
    
  // end.x = (Math.cos(Date.now() / 700 + 1000) * 0.5 + 0.5) * W
  // end.y = (Math.sin(Date.now() / 1000 + 100) * 0.5 + 0.5) * H
  // // end.x = W / 2
  // // end.y = H
  for (var i = 0; i < 400; i++) {
    ctx.beginPath()
    ctx.moveTo(start.x, start.y);
    ctx.bezierCurveTo(r(start.cx), r(start.cy), 
                     r(end.cx), r(end.cy),
                     end.x, end.y)
    ctx.lineWidth = 1;
    ctx.stroke()

  }
}

function animate() {
  requestAnimationFrame(animate)
  canvas.width = canvas.width
  ctx.strokeStyle = lineColor
  ctx.globalAlpha = 0.1
  ctx.globalCompositeOperation = "lighter";
  drawWithPhase(0)
  // ctx.strokeStyle = "#f0f465"
  drawWithPhase(1000)
  // ctx.strokeStyle = "#9cec5b"
  drawWithPhase(3000)
  // ctx.strokeStyle = "#6184db"
  drawWithPhase(2000)
}

animate()
