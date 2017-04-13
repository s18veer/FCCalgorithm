var ww = window.innerWidth,
  wh = window.innerHeight;

var renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("canvas")
});
renderer.setSize(ww, wh);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.01, 10000);
camera.position.z = 180;
camera.position.y = 1;

var controls = new THREE.OrbitControls(camera, renderer.domElement);
var dollyIn = controls.dollyIn;
controls.dollyIn = function(){
  dollyIn();
  checkCameraPosition();
};
var dollyOut = controls.dollyOut;
controls.dollyOut = function(){
  dollyOut();
  checkCameraPosition();
};
controls.noPan = true;

var vectCenter = new THREE.Vector3(0,0,0);
function checkCameraPosition() {
  var dist = vectCenter.distanceTo(camera.position);
  if(dist < 60){
    wireframe = true;
  } else {
    wireframe = false;
  }
  for (var i = 0; i < amount; i++) {
    spheres.children[i].material.wireframe = wireframe;
  }
}

var sphereGeom = new THREE.SphereGeometry(4, 28, 28);

function Blobby(x, y, z, i) {
  this.uniforms = {
    time: {
      value: 1.0
    },
    rainbow: {
      value: new THREE.Vector2(0.2, noise.simplex3(x * 0.001, y * 0.001, z * 0.001))
    }
  };
  var mat = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: document.getElementById("wrapVertexShader").textContent,
    fragmentShader: document.getElementById("wrapFragmentShader").textContent,
    wireframe: true
  });
  this.sphere = new THREE.Mesh(sphereGeom, mat);
  this.sphere.offset = Math.random() * 500;
  this.sphere.uniforms = this.uniforms;
  var ratio = Math.random()*0.1 + 1;
  this.sphere.position.x = x*ratio;
  this.sphere.position.y = y*ratio;
  this.sphere.position.z = z*ratio;
}

var spheres = new THREE.Object3D();
scene.add(spheres);
var tempSphere = new THREE.IcosahedronGeometry(60, 3);
var vertices = tempSphere.vertices;
amount = vertices.length;
for (var i = 0; i < amount; i++) {
  var x = vertices[i].x;
  var y = vertices[i].y;
  var z = vertices[i].z;
  var twin = false;
  for (var j = 0; j < spheres.children.length; j++) {
    if (Math.round(spheres.children[j].position.x) === Math.round(x)) {
      if (Math.round(spheres.children[j].position.y) === Math.round(y)) {
        if (Math.round(spheres.children[j].position.z) === Math.round(z)) {
          twin = true;
        }
      }
    }
  }
  if (!twin) {
    var blob = new Blobby(x, y, z, i);
    spheres.add(blob.sphere);
  }
}

function render(d) {

  for (var i = 0; i < spheres.children.length; i++) {
    spheres.children[i].uniforms.time.value = d * 0.0005 + spheres.children[i].offset;
  }
  spheres.rotation.z = d * 0.00004;
  var color = new THREE.Color("hsl(" + (d * 0.006 + 200) + ",90%,75%)");
  renderer.setClearColor(color);
  
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
requestAnimationFrame(render);

var wireframe = true;

window.addEventListener("resize", onResize);

function onResize() {
  ww = window.innerWidth;
  wh = window.innerHeight;
  camera.aspect = ww / wh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, wh);
}

window.addEventListener("mousedown", onClick);
window.addEventListener("mousemove", onClick);
window.addEventListener("touchdown", onClick);
function onClick(e) {
	var vector = new THREE.Vector2();
  if(e.type === "touchdown"){
    vector.set(
      2 * (e.touches[0].clientX / ww) - 1,
      1 - 2 * (e.touches[0].clientY / wh )
    );
  } else {
    vector.set(
      2 * (e.clientX / ww) - 1,
      1 - 2 * (e.clientY / wh )
    );
  }
	raycaster = new THREE.Raycaster();
	raycaster.setFromCamera(vector,camera);
	intersects = raycaster.intersectObjects(spheres.children);
	if(intersects.length > 0 ){
    var blob = intersects[0].object;
    if(e.type === "mousemove"){
      if(!blob.bounce && blob.scale.x < 1.5){
        TweenMax.to(blob.scale, 1.3, {
          x: 1.5,
          y: 1.5,
          z: 1.5,
          ease: Elastic.easeOut.config(1.5, 0.2),
          onComplete : function(){
            TweenMax.to(blob.scale, 2, {
              x: 1,
              y: 1,
              z: 1,
              ease: Power1.easeIn
            });
            blob.bounce = false;
          }
        });
      }
    } else {
      TweenMax.to(blob.scale, 1.3, {
        x: "+=0.5",
        y: "+=0.5",
        z: "+=0.5",
        ease: Elastic.easeOut.config(1.5, 0.2),
        onComplete : function(){
          TweenMax.to(blob.scale, 2, {
            x: 1,
            y: 1,
            z: 1,
            ease: Power1.easeIn
          });
          blob.bounce = false;
        }
      });
    }
    blob.bounce = true;
  }
}

camera.rotation.set(0,0,0);
checkCameraPosition();
