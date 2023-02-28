//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import * as THREE from 'three'
const scene = new THREE.Scene()

const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10)

camera1.position.z = 2

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
let renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 })
let HD = false;
let pixels = HD ? 2000 : 500;
renderer1.setSize(pixels, pixels)


const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
const groundMaterial = new THREE.MeshBasicMaterial();
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = 0;
groundMesh.rotateY(Math.PI / 4)
groundMesh.rotateZ(Math.PI / 4)
scene.add(groundMesh);

function update() {
    requestAnimationFrame(update)

    renderer1.render(scene, camera1)
}

update()
