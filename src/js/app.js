import '../css/app.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
console.log("Hello World");

export default class Sketch {
    constructor(options) {
        this.container = options.dom;

        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 100);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enableDamping = true;

        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }
    addObjects() {
        this.geo = new THREE.BoxBufferGeometry(1,1,1,5,5,5);
        this.mat = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh(this.geo, this.mat);
        this.scene.add(this.cube);
    }
    setupResize() {
        window.addEventListener('resize', this.resize.bind(this));
    }
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
    }
    render() {
        this.controls.update();
        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}
new Sketch({
    dom: document.getElementById('container')
});