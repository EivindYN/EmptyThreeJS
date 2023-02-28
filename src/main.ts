//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
import * as THREE from 'three'
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xf8f5f2);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10)

camera.position.z = 2

const canvas1 = document.getElementById('canvas1') as HTMLCanvasElement
let renderer = new THREE.WebGLRenderer({ canvas: canvas1 })
let HD = false;
let pixels = HD ? 2000 : 500;
renderer.setSize(pixels, pixels)

const groundGeometry = new THREE.BoxGeometry(1, 1, 1);
const groundMaterial = new THREE.MeshBasicMaterial();
const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
groundMesh.position.y = 0;
groundMesh.rotateY(Math.PI / 4)
groundMesh.rotateZ(Math.PI / 4)
scene.add(groundMesh);

let compose = new EffectComposer(renderer);
let selectedObjects: never[] = []
selectedObjects.push(groundMesh)
let renderPass = new RenderPass(scene, camera);
let outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, selectedObjects);
outlinePass.renderToScreen = true;
outlinePass.selectedObjects = selectedObjects;
outlinePass.overlayMaterial.blending = THREE.NormalBlending

compose.addPass(renderPass);
compose.addPass(outlinePass);
var params = {
    edgeStrength: 2,
    edgeGlow: 1,
    edgeThickness: 1.0,
    pulsePeriod: 0,
    usePatternTexture: false
};

outlinePass.edgeStrength = params.edgeStrength;
outlinePass.edgeGlow = params.edgeGlow;
outlinePass.visibleEdgeColor.set(0xff0000);
outlinePass.hiddenEdgeColor.set(0xffffff);

function update() {
    requestAnimationFrame(update)

    renderer.render(scene, camera)
    compose.render(scene, camera)
}

update()
