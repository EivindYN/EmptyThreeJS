//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import * as THREE from "three";
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf8f5f2);

const camera = new THREE.PerspectiveCamera(75, 1920 / 1080, 0.1, 10);
camera.position.set(0, 1.5, -2);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const boxMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.rotateY(Math.PI / 4);
scene.add(boxMesh);

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0.5, 1.5, -2);
light.target = boxMesh;
scene.add(light);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
let renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(1920, 1080);
function update() {
  //groundMesh.rotateY(Math.PI / 60);
  requestAnimationFrame(update);
  renderer.render(scene, camera);
}
update();
