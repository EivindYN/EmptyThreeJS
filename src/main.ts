//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import * as THREE from "three";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f5f2);

const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 10);
camera.position.y = 1.5;
camera.position.z = 2;

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(1920, 1080);

const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
const groundMaterial = new THREE.MeshPhongMaterial();
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = 0;
groundMesh.rotateY(Math.PI / 4);
scene.add(groundMesh);

const light = new THREE.AmbientLight(0xff0000); // red light
light.intensity = 1;
scene.add(light);

const light2 = new THREE.DirectionalLight(0xffffff); // white light
light2.intensity = 0.5;
light2.position.set(1, 1, 2);
light2.target = groundMesh;
light2.castShadow = true;
scene.add(light2);

camera.lookAt(new THREE.Vector3(0, 0, 0));
function update() {
  requestAnimationFrame(update);

  //groundMesh.rotateY(Math.PI / 60);

  renderer.render(scene, camera);
}
update();
