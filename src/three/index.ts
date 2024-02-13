import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Node from './object/components/node';
import Background from './object/background';
import findNode from './utils/findNode';
import throttle from 'lodash/throttle'

type CoreEvent = "nodeclick"

class MapCore {
  threeObject: Record<string, any> = {}
  eventMap: Record<CoreEvent, Set<(node: Node) => void>> = {
    nodeclick: new Set(),
  }
  private TestNode = new Node({
    x: 10,
    y: 10,
    type: "hunt",
    name: "聚羽之地",
    weather: "thunder",
    resources: [
      "wood",
    ],
    border: "square",
    size: "small"
  })
  constructor() {
    this._init()
  }

  addEventListener(type: CoreEvent, callback: (node: Node) => void): MapCore {
    this.eventMap[type].add(callback)
    return this
  }

  removeEventListener(type: CoreEvent): MapCore;
  removeEventListener(type: CoreEvent, callback: (node: Node) => void): MapCore;
  removeEventListener(type: CoreEvent, callback?: (node: Node) => void) {
    if (callback) this.eventMap[type].delete(callback)
    else this.eventMap[type].clear()
    return this
  }

  private _addClickEvent() {
    const { camera } = this.threeObject
    const model = this.TestNode

    var raycaster = new THREE.Raycaster();

    let startX = 0
    let startY = 0

    function onDocumentMouseDown(event: MouseEvent) {
      startX = event.clientX
      startY = event.clientY
    }

    function onDocumentMouseUp(event: MouseEvent) {
      // 判断是否是真实点击，而不是点击后移动了鼠标
      if (Math.abs(startX - event.clientX) > 10 || Math.abs(startY - event.clientY) > 10) {
        return
      }

      event.preventDefault();

      var mouseVector = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects([model], true); // model 表示要监听点击事件的模型

      if (intersects.length > 0) {
        const node = findNode(intersects)

        if (node) {
          node.setPointSelected(!node.selected)
        }
      } else {

      }
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
  }

  private _init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const background = new Background()
    scene.add(background)

    scene.add(this.TestNode)

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
    else {
      const axesHelper = new THREE.AxesHelper(10);
      scene.add(axesHelper);
      this._devOrbitControls()
    }
    this._startAnimate()
    this._addClickEvent()

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
