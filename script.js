// Import the necessary modules
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

// Set up the renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

// Set up the camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

// Set up the scene
const scene = new THREE.Scene();

// Set up the controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

// Load the model
const loader = new GLTFLoader();
loader.load("/assets/watch_holder.gltf", (gltfScene) => {
    gltfScene.scene.rotation.x = -Math.PI / 2;
    gltfScene.scene.rotation.z = -Math.PI / 2;
    gltfScene.scene.position.set(1, 0, 0)
    gltfScene.scene.scale.set(15, 15, 15);

    scene.add(gltfScene.scene);
});

// Set up the light
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x000fff);
scene.add(hemiLight);

// Set up the animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();