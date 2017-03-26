var t, 
		theta, 
		numb = 4,
		maxFrameCount = 100, 
		a = 31, 
		b = 7;

function setup() {
  createCanvas(540, 540);
	 
  noFill();
  strokeWeight(3);
  frameRate(30);
}

function draw() {
 	background(20);
  translate(width/2, height/2);  
  t = frameCount/maxFrameCount;
  theta = TWO_PI*t;
  for ( var x= 0; x <= 300; x += 15) {
    for (var i = 0; i < numb-1; i++) {
      var rot = TWO_PI/numb*i;

      var offSet = (i*b)+(x*a);   
      var sz1 = map(cos(-(theta)+offSet), 0, 1, 90, 60);
      var sz2 = map(sin(-(theta)+offSet), 0, 1, 60, 90);

      stroke(160-(x/3), 150-(x/2), 105+(x/3));
      rotate(rot);
      arc(0, 0, x, x, radians(sz2), radians(sz1));
    }
  }
}
