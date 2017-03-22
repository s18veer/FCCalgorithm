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
/*
                         
var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
var sun = new THREE.Mesh( geometry, material );
*/
scene.add( sun );
function newPlanet(dfc, size, isGas) {
  var segments = 100
  gr = {}
  gr.dfc = dfc
  gr.size = size
  gr.color = {}
  gr.color.land = {}
  gr.color.land.r = randint(0, 255)
  gr.color.land.g = randint(0, 255)
  gr.color.land.b = randint(0, 255)
  gr.color.water = {}
  if (isGas) {
    gr.color.water.r = gr.color.land.r
    gr.color.water.g = gr.color.land.g
    gr.color.water.b = gr.color.land.b
    segments = 32
  } else {
  gr.color.water.r = randint(0, 255)
  gr.color.water.g = randint(0, 255)
  gr.color.water.b = randint(0, 255)
  }
  var simplex = new SimplexNoise();
  var diff = segments / 4
  var geometry = new THREE.SphereGeometry( size, segments, segments );
for ( var i = 0; i < geometry.faces.length; i +=2 ) {

    var face = geometry.faces[ i ];
  var choices = []
  var x = i % segments
  var y = Math.floor(i / segments)
  var colorChoice
  if (simplex.noise2D(x / 30, y / 30) >= 0.1) {
    colorChoice = 'land'
  } else {
    colorChoice = 'water'
  }
  var color
  if (colorChoice == 'land') {
    color = rgb2color(gr.color.land.r,gr.color.land.g ,gr.color.land.b)
  } else {
    color = rgb2color(gr.color.water.r,gr.color.water.g ,gr.color.water.b)
  }
  var face2 = geometry.faces[i+1]
    face.color.setHex( color );
  face2.color.setHex( color );
    
    face.colorChoice = colorChoice
  face2.colorChoice  = colorChoice ;
}
gr.mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { vertexColors: THREE.FaceColors } ));
  /*
  var material = new THREE.MeshPhongMaterial({color: RGB(gr.color.r, gr.color.g, gr.color.b)})
  gr.mesh = new THREE.Mesh( geometry, material);
  */
  gr.mesh.position.z = dfc
  point = {x: gr.mesh.position.x, y: gr.mesh.position.z}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, randint(0, 360))
  gr.mesh.position.x = r.x
  gr.mesh.position.z = r.y
  //rotation
  gr.axisRotation = randoffset(20, 10)
  gr.mesh.rotation.x = deg(gr.axisRotation)
  gr.mesh.rotation.z = deg(gr.axisRotation)
  scene.add(gr.mesh)
  if (isGas) {
    gr.isRing = Math.random() >= 0.3
  }
  if (gr.isRing) {
    gr.ring = {}
    gr.ring.count = 150,
    gr.ring.particles = new THREE.Geometry(),
    gr.ring.material = new THREE.PointsMaterial({
      size: 10,
      map: createCanvasMaterial(rgb2hex(RGB(randint(0, 255), randint(0, 255), randint(0, 255))), 256),
      transparent: true,
      depthWrite: false
    });

// now create the individual particles
for (var p = 0; p < gr.ring.count; p++) {

  // create a particle with random
  var pX = randoffset(size * 1.5, 10),
      pY = randoffset(0, 10),
      pZ = 0
  point = {x: pX, y: 0}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, randint(0, 360))
  pX = r.x
  pY = r.y
  var particle = new THREE.Vector3(pX, pY, pZ)

  // add it to the geometry
  gr.ring.particles.vertices.push(particle);
  gr.ring.rdeg = randint(25, 50) / 100
}

// create the particle system
gr.ring.system = new THREE.Points(
    gr.ring.particles,
    gr.ring.material);

