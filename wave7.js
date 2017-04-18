
var xspacing = 20;    // Distance between each horizontal locationvar w;                // Width of entire wavevar theta = 0.0;      // Start angle at 0var amplitude = 75.0; // Height of wavevar period = 300.0;   // How many pixels before the wave repeatsvar dx;               // Value for incrementing xvar yvalues;  // Using an array to store height values for the wave

function setup() {   createCanvas(1600, 400);  w = width+16;  dx = (TWO_PI / period) * xspacing;  yvalues = new Array(floor(w/xspacing));  renderWave(7);}
function draw() {    background(250);  calcWave();  renderWave();      }
function calcWave() {  // Increment theta (try different values for   // 'angular velocity' here)  theta += 0.05;
  // For every x value, calculate a y value with sine function  var x = theta;  for (var i = 0; i < yvalues.length; i++) {    yvalues[i] = sin(x)*amplitude;    x+=dx;  }}
function renderWave(level) {  noStroke();  fill(0, 102, 153);
  // A simple way to draw the wave with an ellipse at each location  for (var x = 0; x < yvalues.length; x++) {    ellipse(x*xspacing, height/2+yvalues[x], 16, 16);  }}
