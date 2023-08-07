//npm install dat.gui --save-dev
//npm install @types/dat.gui --save-dev
// @ts-ignore
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
// @ts-ignore
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

let loader = new GLTFLoader();
let geometry: THREE.BufferGeometry;
loader.load(`/cube.gltf`, (gltf: any) => {
    geometry = gltf.scene.children[0].children[0].geometry;
    const material = new THREE.MeshStandardMaterial();
    let mesh = new THREE.Mesh(geometry, material);
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    let ctx = canvas.getContext("2d")!!;
    ctx.rect(0, 0, 400, 400);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.fillStyle = "red";
    ctx.fillRect(0, 0, 200, 400);
    const uvAttribute = geometry.getAttribute( 'UVMap' );
    console.log(uvAttribute)
    material.map = new THREE.Texture(canvas);
    material.map.wrapS = THREE.RepeatWrapping;
    material.map.wrapT = THREE.RepeatWrapping;
    material.map.repeat.set( 40, 40 );
    material.map.flipY = false;
    material.map.needsUpdate = true;
    mesh.scale.set(0.5, 0.5, 0.5);
    scene.add(mesh);
    loader.load(`/cube_extruded.gltf`, (gltf: any) => {
        const positionAttribute = geometry.getAttribute( 'position' );
        let geometry2: THREE.BufferGeometry = gltf.scene.children[0].children[0].geometry;
        const positionAttribute2 = geometry2.getAttribute( 'position' );
        for ( let i = 0; i < positionAttribute.count; i ++ ) {
            let x_start = positionAttribute.getX(i)
            let y_start = positionAttribute.getY(i)
            let z_start = positionAttribute.getZ(i)
            let x_end = positionAttribute2.getX(i)
            let y_end = positionAttribute2.getY(i)
            let z_end = positionAttribute2.getZ(i)
            let x_diff = x_end - x_start
            let y_diff = y_end - y_start
            let z_diff = z_end - z_start
            positionAttribute.setXYZ( i, x_start + x_diff * 5, y_start + y_diff * 5, z_start + z_diff * 5);
        }
        positionAttribute.needsUpdate = true;
        geometry.computeBoundingBox(); // probably unnessary, but done incase
        geometry.computeBoundingSphere(); // probably unnessary, but done incase
      });
  });
scene.add(new THREE.AmbientLight())

function update() {
    requestAnimationFrame(update)
    rendrerer.render(scene, camera)
}
update()
