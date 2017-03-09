var y, a, f;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(34);
  a = random(2,10);
  f = random(0.05);
}

function draw() {
  //background(34);
  fill(34);
  noStroke();
  rect(width-200,20,200 ,50 );
  fill(238);
  textAlign(RIGHT);
  text("click to redraw", width-50,50);
  stroke(238, 10);
  var amplitude = a; //10;
  var frequency = f; //0.01;
  beginShape();
  noFill();
  for (var x=0; x<width; x+=2) {
    y = sin(x*frequency);
    var t = 0.000001*(-millis()*130);
    t = -frameCount/500.0;
    y += sin(x*frequency*2.1 + t)*4.5;
    y += sin(x*frequency*1.72 + t*1.121)*4.0;
    y += sin(x*frequency*2.221 + t*0.437)*5.0;
    y += sin(x*frequency*3.1122+ t*4.269)*2.5;
    y *= amplitude;
    vertex(x, height/2+y);
  }
  endShape();
  if (frameCount%1000===0) initV();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function initV() {
  background(34);
  a = random(2,10);
  f = random(0.05);
}

function mouseReleased() {
  initV();
}
