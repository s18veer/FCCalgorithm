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
  
