var s = 8, m = 20;

function setup() {
  createCanvas(400, 400);
  strokeJoin(ROUND);
  stroke(255);
  strokeWeight(4);
	noFill();
	//fill(150,50,200);
}

function draw() {
  background(0,0,50);
  translate(width/2, height/2);
  for (var i = 0; i < 360; i+=m) {
    push();
    translate(0, 0);
    rotate(radians(i));
    
		beginShape();
		
    for (var j = 0; j <= m; j+=0.5) {
      var line1 = (sin(radians(j*9+frameCount))*(5+sin(radians(j*9))*(j*3)));
      vertex(sin(radians(0))*(10+j*s)+line1, (10+j*s)+10);
    }
		
    for (var k = m; k >= 0; k-=0.5) {
      var line2 = (sin(radians(k*9+frameCount))*(5+sin(radians(k*9))*(k*3)));
      vertex(sin(radians(0))*(10+k*s)-line2, (10+k*s)+10);
    }
		
    endShape(CLOSE);
    pop();
  }

}
