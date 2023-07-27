//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as THREE from 'three'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10)
const canvas = document.getElementById('canvas') as HTMLCanvasElement
let rendrerer = new THREE.WebGLRenderer({ canvas: canvas })
function setup(){
    camera.position.z = 2
    let HD = false;
    let pixels = HD ? 2000 : 500;
    rendrerer.setSize(pixels, pixels)
    const orbitControls = new OrbitControls(camera, rendrerer.domElement);
    scene.add(orbitControls)
}
setup()


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
    rendrerer.render(scene, camera)
}
update()
