import '../css/app.scss';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module';
// Compression with gltfpack, command -> gltfpack -i mwuvn.gltf -o mwuvnPacked.glb -cc

export default class Sketch {
    constructor(options) {
        this.container = options.dom;

        this.scene = new THREE.Scene();

        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.01, 500);
        this.camera.position.z = 5;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        // this.controls.enableDamping = true;

        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }
    addObjects() {

        // this.geo = new THREE.BoxBufferGeometry(1,1,1,5,5,5);
        // this.mat = new THREE.MeshNormalMaterial();
        // this.cube = new THREE.Mesh(this.geo, this.mat);
        // this.cube.position.set(-5,-5,-5)
        // this.scene.add(this.cube);

        var loader = new GLTFLoader();
        loader.setMeshoptDecoder(MeshoptDecoder);
        var dracoLoader = new DRACOLoader();
        dracoLoader.setDecoderPath('../src/draco-files/');
        loader.setDRACOLoader(dracoLoader);
        loader.load('../src/models/skullNormals.glb', (gltf) => {
            gltf.scene.traverse(function (child) {
                if (child.isMesh) {
                    child.material = new THREE.MeshNormalMaterial();
                }
            });
            this.scene.add(gltf.scene);
        }, function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        }, function (error) {
                console.log('An error happened');
        });
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