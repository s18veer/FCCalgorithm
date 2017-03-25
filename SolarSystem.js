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

// add it to the scene
scene.add(gr.ring.system);
    gr.ring.system.rotation.x = deg(randint(0, 360))
    gr.ring.system.rotation.y = deg(randint(0, 360))
  } else {
  gr.moonCount = randint(0, 10)
  gr.moons = []
  for (var i = 0; i < gr.moonCount; i++) {
    gr.moons.push(newMoon(gr.size, gr.mesh.position, dfc, gr.moonCount))
  }
  }
  return gr
}
function newMoon(size, position, dfc, num) {
  gl = {}
  gl.size = (size / 2) / (num)
  gl.dfc = dfc
  gl.size = randoffset(gl.size, size / 10)
  var geometry = new THREE.TetrahedronGeometry( gl.size, randint(2,1));
  var color = randint(100, 100)
  gl.color = color
  var material = new THREE.MeshPhongMaterial({color: rgb2hex(RGB(color,color,color))})
  gl.mesh = new THREE.Mesh(geometry, material)
  scene.add(gl.mesh)
  gl.mesh.position.x = (size * 2) + position.x + gl.size
  gl.mesh.position.y = position.y
  gl.mesh.position.z = position.z
  /*
  point = {x: gl.mesh.position.x, y: gl.mesh.position.z}
  center = {x: position.x, y: position.z}
  r = rotateAround(point, center, randint(0, 360))
  gl.mesh.position.x = r.x
  gl.mesh.position.z = r.y
  */
  pi2 = Math.PI * 2
  gl.rdeg = randint(25, 50) / 100
  gl.rang = randint(-pi2, pi2 * 2) / 10
  return gl
}
planets = []
prev = 200
var mindfc
var astPlace = randint(3, 4)
var astDist
for (var i = 0; i < 10; i++) {
  if (i != astPlace) {
  sizeD = Math.abs(prev - 100) / 20
  size = randint(sizeD, 50)
  dfc = size + prev
  dfc += randint(50, 50)
  if (i == 0) {
    mindfc = dfc
  }
    var gasplanet = false
    if (i > astPlace) {
      gasplanet = true
    }
  planets.push(newPlanet(dfc, size, gasplanet))
  prev = dfc + size
  } else {
    prev += 100
    astDist = prev - 50
  }
}
//asteroid particle system:



var astCount = 600,
    asteroids = new THREE.Geometry(),
    aMaterial = new THREE.PointsMaterial({
      size: 10,
      map: createCanvasMaterial('#'+808080, 256),
      transparent: true,
      depthWrite: false
    });

// now create the individual particles
for (var p = 0; p < astCount; p++) {

  // create a particle with random
  var pX = randoffset(astDist, 20),
      pY = randoffset(0, 20),
      pZ = 0
  point = {x: pX, y: 0}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, randint(0, 360))
  pX = r.x
  pZ = r.y
  var particle = new THREE.Vector3(pX, pY, pZ)

  // add it to the geometry
  asteroids.vertices.push(particle);
}

// create the particle system
var astSystem = new THREE.Points(
    asteroids,
    aMaterial);

// add it to the scene
scene.add(astSystem);



//star particle system
var starCount = 1000,
    stars = new THREE.Geometry(),
    sMaterial = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 50
    });

// now create the individual particles
for (var p = 0; p < starCount; p++) {

  // create a particle with random
  var pX = randint(5000, 5000),
      pY,
      pZ
  point = {x: pX, y: 0}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, randint(0, 360))
  pX = r.x
  pY = r.y
  point = {x: pX, y: 0}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, randint(0, 360))
  pX = r.x
  pZ = r.y
  var particle = new THREE.Vector3(pX, pY, pZ)

  // add it to the geometry
  stars.vertices.push(particle);
}

// create the particle system
var starSystem = new THREE.Points(
    stars,
    sMaterial);

// add it to the scene
scene.add(starSystem);
      //end of elements
			camera.position.x = 2000;
      camera.position.y = 500
      camera.position.z = 0;
      lookAt = new THREE.Vector3( 0, 0, 0 )
camera.lookAt(lookAt)
oControls.target.set(0, 0, 0);
oControls.enablePan = false;
oControls.minDistance = 300;
oControls.maxDistance = 5000;
oControls.update()
			var render = function () {
				requestAnimationFrame( render );
        mainloop()
				renderer.render(scene, camera);
			};
function sunrotate(p) {
  var rdeg = 100 / (p.dfc + 30 - mindfc)
    rdeg /= 3
      point = {x: p.mesh.position.x, y: p.mesh.position.z}
  center = {x: 0, y: 0}
  r = rotateAround(point, center, rdeg)
  p.mesh.position.x = r.x
  p.mesh.position.z = r.y
    point = {x: p.mesh.position.x, y: p.mesh.position.y}
  r = rotateAround(point, center, (rdeg / Math.PI)/2)
  p.mesh.position.x = r.x
  p.mesh.position.y = r.y
  return p
    }
function mainloop() {
  for (var i = 0; i < planets.length; i++) {
    
    planet = planets[i]
    planet = sunrotate(planet)
    planet.mesh.rotation.y += deg(1)
    if (planet.isRing) {
      planet.ring.system.rotation.z -= deg(planet.ring.rdeg)
      planet.ring.system.position.x = planet.mesh.position.x
      planet.ring.system.position.y = planet.mesh.position.y
      planet.ring.system.position.z = planet.mesh.position.z
    } else {
  for (var l = 0; l < planet.moons.length; l++) {
    moon = planet.moons[l]
    moon = sunrotate(moon)
    point = {x: moon.mesh.position.x, y: moon.mesh.position.z}
  center = {x: planet.mesh.position.x, y: planet.mesh.position.z}
  r = rotateAround(point, center, moon.rdeg)
  moon.mesh.position.x = r.x
  moon.mesh.position.z = r.y
    
    point = {x: moon.mesh.position.x, y: moon.mesh.position.y}
  center = {x: planet.mesh.position.x, y: planet.mesh.position.y}
  r = rotateAround(point, center, moon.rang)
  moon.mesh.position.x = r.x
  moon.mesh.position.y = r.y
    moon.mesh.rotation.x += deg(1)
    moon.mesh.rotation.y += deg(1)
  }
    }
  }
  astSystem.rotation.y -= deg(0.05)
}
			render();

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}
