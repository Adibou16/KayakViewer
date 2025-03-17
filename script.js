// Import the necessary modules
import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import { GLTFLoader } from "jsm/loaders/GLTFLoader.js";

// Set up the renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(w, h);
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild(renderer.domElement);

// Set up the renderer's CSS
renderer.domElement.style.position = "absolute";
renderer.domElement.style.top = "0";
renderer.domElement.style.left = "0";
renderer.domElement.style.width = "100%";
renderer.domElement.style.height = "100%";
renderer.domElement.style.zIndex = "-1"; // Send the renderer behind other elements
document.body.style.margin = "0"; // Remove default margin
document.body.style.overflow = "hidden"; // Prevent scrolling

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

let modelMaterial; // Variable to store the model's material

// Load the model
const loader = new GLTFLoader();
loader.load("/assets/watch_holder.gltf", (gltfScene) => {
  const root = gltfScene.scene;

  // Set the position, rotation, and scale of the model
  root.rotation.x = -Math.PI / 2;
  root.rotation.z = -Math.PI / 2;
  root.position.set(1, 0, 0);
  root.scale.set(15, 15, 15);

  // Set the color and material of the model
  root.traverse((child) => {
    if (child.isMesh) {
      modelMaterial = child.material;
      modelMaterial.color = new THREE.Color(0xffffff);
      modelMaterial.map = new THREE.TextureLoader().load("assets/plastic.jpg");
      modelMaterial.map.repeat.set(1, 0.75);
      modelMaterial.material = new THREE.MeshLambertMaterial();
      modelMaterial.roughness = 1;
    }
  });

  scene.add(root);
});

// Add neutral lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft white ambient light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6); // Neutral directional light
directionalLight.position.set(5, 10, 7.5); // Position the light
scene.add(directionalLight);

// Add event listener for the color picker
const colorBoxes = document.querySelectorAll('.color-box');
const target = document.getElementById('target');

colorBoxes.forEach(box => {
  box.addEventListener('click', () => {
    const color = box.dataset.color;
    modelMaterial.color.set(color);
  });
});

// Set up the animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  controls.update();
}
animate();