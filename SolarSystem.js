var scene = new THREE.Scene();
			var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 99999999 );

			var renderer = new THREE.WebGLRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
			document.body.appendChild( renderer.domElement );
var oControls = new THREE.OrbitControls(camera, renderer.domElement);
scene.add(new THREE.AmbientLight( 0xffffff, 0.4 ))
      //Create elements here:
function createCanvasMaterial(color, size) {
	var matCanvas = document.createElement('canvas');
  matCanvas.width = matCanvas.height = size;
  var matContext = matCanvas.getContext('2d');
  // create exture object from canvas.
  var texture = new THREE.Texture(matCanvas);
  // Draw a circle
  var center = size / 2;
  matContext.beginPath();
  matContext.arc(center, center, size/2, 0, 2 * Math.PI, false);
  matContext.closePath();
  matContext.fillStyle = color;
  matContext.fill();
  // need to set needsUpdate
  texture.needsUpdate = true;
  // return a texture made from the canvas
  return texture;
}
addNote()
function deg(i) {
  return i * Math.PI / 180
}
function RGB(r, g, b) {
  function colorcheck(c) {
  if (c > 255) {
    c = 255
  }
  if (c < 0) {
    c = 0
  }
    return c
  }
  r = colorcheck(r)
  g = colorcheck(g)
  b = colorcheck(b)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
function rgb2hex(rgb){
 rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
 return (rgb && rgb.length === 4) ? "#" +
  ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
  ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
function rotateAround(point, center, angle) {
  angle = (angle) * (Math.PI/180); // Convert to radians
var rotatedX = Math.cos(angle) * (point.x - center.x) - 
    Math.sin(angle) * (point.y-center.y) + 
    center.x;
var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
  return {x: rotatedX, y: rotatedY}
}
function rotateAround3d(point, center, angle) {
  angle = (angle) * (Math.PI/180); // Convert to radians
var rotatedX = Math.cos(angle) * (point.x - center.x) - 
    Math.sin(angle) * (point.y-center.y) + 
    center.x;
var rotatedY = Math.sin(angle) * (point.x - center.x) + Math.cos(angle) * (point.y - center.y) + center.y;
  return {x: rotatedX, y: rotatedY}
}
function rgb2color(r, g, b) {
  return dec2hex(rgb2hex(RGB(r, g, b)))
}
function dec2hex(i) {
    var result = "0x"
   result = result + i.slice(1)
  return result
  }
function randint(min, max) {
  return Math.floor(Math.random() * max) + min
}
function randoffset(num, off) {
  return randint(num - off, off * 2)
}
//three.js adding objects:
var light = new THREE.PointLight('yellow', 3, 3000);
light.position.set( 0, 0, 0 );
scene.add(light);
var geometry = new THREE.TetrahedronGeometry( 200, 5);
var c = 0
console.log(255 / geometry.faces.length)
for ( var i = 0; i < geometry.faces.length; i ++ ) {

    var face = geometry.faces[ i ];
    color = rgb2color(255, randint(0, 150), 0)
  c += 255 / geometry.faces.length
  //console.log(c)
    face.color.setHex( color );

}
var noise = 5
for(var i=0; i<geometry.vertices.length; i++){
      var v = geometry.vertices[i];
      v.x += -noise/2 + Math.random()*noise;
      v.y += -noise/2 + Math.random()*noise;
      v.z += -noise/2 + Math.random()*noise;
}
var sun = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors } ));
