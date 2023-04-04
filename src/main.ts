//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'
const scene = new THREE.Scene()

const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)

camera1.position.z = 2

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
let renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
let HD = false;
let pixels = HD ? 2000 : 500;
renderer1.setSize(pixels, pixels)

const orbitControls = new OrbitControls(camera1, renderer1.domElement);
scene.add(orbitControls)


const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
const groundMaterial = new THREE.MeshStandardMaterial();
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
scene.add(new THREE.AmbientLight())
groundMesh.position.y = 0;
groundMesh.rotateY(Math.PI / 4)
groundMesh.rotateZ(Math.PI / 4)
scene.add(groundMesh);

function update() {
    requestAnimationFrame(update)

    renderer1.render(scene, camera1)
}

update()
