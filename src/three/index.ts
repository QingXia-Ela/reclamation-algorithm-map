import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Node from './object/components/node';
import Background from './object/background';

class MapCore {
  threeObject: Record<string, any> = {}
  constructor() {
    this._init()
  }

  private _init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const background = new Background()
    scene.add(background)

    const axesHelper = new THREE.AxesHelper(10);
    scene.add(axesHelper);

    const TestNode = new Node({
      x: 10,
      y: 10,
      type: "hunt",
      name: "聚羽之地",
      weather: "thunder",
      resources: [
        "wood",
      ],
      border: "square",
      size: "large"
    })
    scene.add(TestNode)

    // const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // const cube = new THREE.Mesh(geometry, material);

    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    this.threeObject = {
      scene,
      camera,
      renderer,
    }
    // @ts-ignore: process is exist
    if (process.env.NODE_ENV === "production") this._addOrbitControls()
    else this._devOrbitControls()
    this._startAnimate()

    document.body.appendChild(renderer.domElement);
  }

  private _devOrbitControls() {
    const { camera, renderer } = this.threeObject
    const controls = new OrbitControls(camera, renderer.domElement)

    // 修改按键功能，保持用户操作习惯
    controls.mouseButtons.LEFT = THREE.MOUSE.PAN
    // right button will add context menu, so disable here
    controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE

    this.threeObject.controls = controls
  }

  // now only support 2d
  private _addOrbitControls() {
    const { camera, renderer } = this.threeObject
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true

    controls.maxDistance = 60
    controls.minDistance = 10

    controls.mouseButtons.LEFT = THREE.MOUSE.PAN
    // right button will add context menu, so disable here
    controls.mouseButtons.RIGHT = undefined
    this.threeObject.controls = controls
  }

  private _startAnimate() {
    const { renderer, scene, camera, controls } = this.threeObject
    const animate = () => {
      controls?.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate()
  }

  /**
   * @deprecated 还没想好要怎么个 handle 法
   */
  // @ts-ignore: deprecated now
  private _handleHMR() { }
}

export default MapCore
