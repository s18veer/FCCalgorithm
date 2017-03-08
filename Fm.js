console.clear();

var s = new System();

function System() {
  var sys = this;
  sys.canvas = document.createElement("canvas");
  document.body.appendChild(sys.canvas);
  sys.context = sys.canvas.getContext("2d");
  sys.width = sys.canvas.width;
  sys.height = sys.canvas.height;
  sys.particles = [];
  
  sys.drag = .96128524;

  sys.setSize = function(w, h) {
    this.width = w || window.innerWidth;
    this.height = h || window.innerHeight;
    this.fitCanvas(this.width, this.height);
  };
  sys.fitCanvas = function(w, h) {
    this.canvas.width = w || this.width;
    this.canvas.height = h || this.height;
    this.context.translate(this.width / 2, this.height / 2);
  };
  window.addEventListener("resize", function() {
    sys.setSize(window.innerWidth, window.innerHeight);
  });
  sys.draw = function(time) {
    requestAnimationFrame(sys.draw);
    sys.clear();
    sys.particles.forEach(sys.drawParticles);
    sys.maskOutCenter();
    sys.update();
  };
  sys.maskOutCenter = function() {
    sys.context.globalCompositeOperation = "destination-out";
    sys.context.arc(
      0, 0,
      Math.min(sys.width,sys.height)/10,
      0, Math.PI * 2
    );
    sys.context.fill();
    sys.context.globalCompositeOperation = "source-over";
  }
  sys.drawParticles = function(particle) {
    if(typeof particle.draw === "function") {
      particle.draw(sys.context);
    }
  };
  sys.update = function() {
    sys.particles = sys.particles.filter(sys.isParticleMoving);
    sys.particles.forEach(sys.updateParticles);
  };
  sys.isParticleMoving = function(particle) {
    return (
      Math.round(particle.velocity[0] * 1000) !== 0 &&
      Math.round(particle.velocity[1] * 1000) !== 0
    );
  };
  sys.updateParticles = function(particle) {
    if(typeof particle.update === "function") {
      particle.update(sys);
    }
  };
  sys.clear = function(color) {
    this.context.save();
    this.context.setTransform(1, 0, 0, 1, 0, 0);
    if(color) {
      this.context.fillStyle = color || "#000";
      this.context.fillRect(0, 0, s.width, s.height);
    } else {
      this.context.clearRect(0, 0, s.width, s.height);
    }
    this.context.restore();
  };
  sys.start = function() {
    this.setCanvasStyle();
    var angle = 0;

    sys.createParticles(0, 0);
    var interval = setInterval(function() {
      angle += 137.5077640500378546463487;
      
      var rnd = (
        Math.random() * Math.random() *
        Math.random() * Math.random()
      );

      if(sys.particles.length < 2000) {
        sys.createParticles(6, angle * (Math.PI / 180));
      }
    }, 1000 / 15);

    this.draw(window.performance.now());
  };
  sys.setCanvasStyle = function() {
    document.body.style.overflow = "hidden";
    this.canvas.style.position = "absolute";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "auto";
    this.canvas.style.imageRendering = "pixelated";
  };
  sys.createParticles = function(amount, rotation) {
    for(var i = 0; i < amount; i++) {

      var color = [i * 1 / (amount - 1)].map(function(e){
        return "rgb(" + [
          (Math.sin((i + 1) / amount * Math.PI * 2) * 128 + 128).toFixed(0) % 255,
          (Math.sin((i + 1) / amount * Math.PI * 2 + (Math.PI / 2)) * 200 + 54).toFixed(0) % 255,
          (Math.sin((i + 1) / amount * Math.PI * 3 + (Math.PI * -3)) * 192 + 63).toFixed(0) % 255
        ].join(", ") + ")";
      })[0];

      sys.particles.push(
        sys.createParticle(
          i,
          amount,
          color,
          [
            (Math.max(sys.width, sys.height) * 0.02) *
            Math.sin(
              ((i + 1) / amount) * (Math.PI * 2) + rotation
            ),
            (Math.max(sys.width, sys.height) * 0.02) *
            Math.cos(
              ((i + 1) / amount) * (Math.PI * 2) + rotation
            )
          ]
        )
      );
    }
  };
  sys.createParticle = function(index, amount, color, velocity) {
    var position = [0, 0];
    var velocity = [
      velocity[0],
      velocity[1]
    ];
    return new Particle(position, velocity, color);
  };
  return sys;
};
function Particle (position, velocity, color) {
  var par = this;
  par.color = color || "#000";
  par.radius = 1;
  par.friction = 1 - 0.06125;
  if(position.length === 2) {
    par.position = [position[0], position[1]];
  } else {
    par.position = [0, 0];
  }
  if(velocity.length === 2) {
    par.velocity = [velocity[0], velocity[1]];
  } else {
    par.velocity = [0, 0];
  }
  par.update = function(sys) {
    this.radius =
      Math.sqrt(
        Math.abs(this.velocity[0]) *
        Math.abs(this.velocity[1]) * Math.min(sys.width,sys.height) / 20
    ) + 0.125;
    if(this.position[0] >= sys.width * 0.5 ||
      this.position[0] <= (0 - sys.width * 0.5)) {
      this.position[0] =
        Math.sign(this.position[0]) * sys.width * 0.5;
      this.velocity[0] *= -this.friction;
      this.velocity[1] *=  this.friction;
    }
    if(this.position[1] >= sys.height * 0.5 ||
      this.position[1] <= (0 - sys.height * 0.5)) {
      this.position[1] =
        Math.sign(this.position[1]) * sys.height * 0.5;
      this.velocity[0] *=  this.friction;
      this.velocity[1] *= -this.friction;
    }
    this.velocity[0] *= sys.drag;
    this.velocity[1] *= sys.drag;
    this.position[0] += this.velocity[0];
    this.position[1] += this.velocity[1];
  };
  par.draw = function(ctx) {
    ctx.fillStyle = this.color;
    ctx.globalCompositeOperation = "source-over";
    ctx.beginPath();
    ctx.arc(
      par.position[0],
      par.position[1],
      par.radius,
      0, 2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.globalCompositeOperation = "destination-out";
    ctx.arc(
      par.position[0],
      par.position[1],
      Math.max(0, par.radius / 4 * 3),
      0, 2 * Math.PI
    );
    ctx.fill();
    ctx.closePath();
  };
  return par;
}
s.setSize();
s.start();
