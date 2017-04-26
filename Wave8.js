TweenLite.defaultEase = Linear.easeNone;
TweenLite.set("g", { y: window.innerHeight / 2 });

var svg = document.querySelector("svg");
var $wave = document.querySelector("#wave");

var contour1 = new CustomEase("contour1", "M0,0 C0.4,0 0.3,1 0.5,1 0.7,1 0.6,0 1,0");
var contour2 = new CustomEase("contour2", "M0,0,C0,0,0.5,1,0.5,1,0.5,1,1,0,1,0");
var contour3 = new CustomEase("contour3", "M0,0,C0,0.302,0,1,0.2,1,0.4,1,0.6,0,1,0");

var width = 800;
var segments = 500;
var interval = width / segments;

var wave = {
  amplitude: 0,
  frequency: 1,
  points: []
};

for (var i = 0; i <= segments; i++) {
  
  var period = i / segments;
  var point = $wave.points.appendItem(svg.createSVGPoint());
  
  point.x = i * interval;
  point.y = 0;
  
  wave.points.push({
    ratio: 0,
    period: period,
    point: point,
    update: function() {
      var cycle  = Math.sin(this.period * wave.frequency * Math.PI * 2);
      var height = this.ratio * wave.amplitude / 2;
      this.point.y = cycle * height;
    }
  }); 
}

update();
