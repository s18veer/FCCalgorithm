var incr = 0;
var spiral = true;

function setup() {
  createCanvas(485, 485);
}

function draw() {
  background(0);
	
	var color = ['rgb(255, 0 , 0)', 'rgb(255, 127, 0)','rgb(255, 255, 0)','rgb(0, 255, 0)','rgb(0, 0, 255)','rgb(75, 0, 130)','rgb(148, 0, 211)'];
	
  translate(width/2, height/2);
	
  for (var i = 0; i < 84; i++) {
		fill(color[i%7]);
    bezier(200, 34, 300, 141, 63, 10, 49, 91);
    rotate((incr));
    if (spiral) scale(1, 0.99);
  }
	
  incr += map(mouseX, 0, width, -.005, .005);
  pop();
};

function mousePressed() {
  spiral = !spiral;
}
