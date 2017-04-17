
var xspacing = 20;    // Distance between each horizontal locationvar w;                // Width of entire wavevar theta = 0.0;      // Start angle at 0var amplitude = 75.0; // Height of wavevar period = 300.0;   // How many pixels before the wave repeatsvar dx;               // Value for incrementing xvar yvalues;  // Using an array to store height values for the wave

function setup() {   createCanvas(1600, 400);  w = width+16;  dx = (TWO_PI / period) * xspacing;  yvalues = new Array(floor(w/xspacing));  renderWave(7);}
function draw() {    background(250);  calcWave();  renderWave();      }
