import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Node from '../object/components/node';
import Background from '../object/background';
import findNode from '../utils/findNode';
import { NodeProps } from '../types/node';
import Line from '../object/components/line';

type CoreEvent = "nodeclick" | "lineclick" | 'contextmenu' | 'mousemove'

function getMouseVector(event: MouseEvent) {
  const mouseVector = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  return mouseVector
}

class MapCore {
  threeObject: Record<string, any> = {}
  eventMap = {
    nodeclick: new Set<(node: Node) => void>(),
    lineclick: new Set<(line: Line) => void>(),
    contextmenu: new Set<(event: MouseEvent, intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) => void>(),
    mousemove: new Set(),
  }
  nodeMap: Record<string, Node> = {}
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

  /**
   * Adds a point to the scene and the node map.
   *
   * @param {NodeProps} options - The options for the point to be added.
   * @return The point that was added to the scene.
   */
  addPoint(options: NodeProps) {
    const node = new Node(options)
    this.nodeMap[node.uuid] = node
    this.threeObject.scene.add(node)
    return node
  }

  /**
   * Retrieves a point using its UUID.
   *
   * @param {string} uuid - The UUID of the point to retrieve.
   * @return The point corresponding to the UUID.
   */
  getPointByUUID(uuid: string): Node | null {
    return this.nodeMap[uuid] || null
  }

  /**
 * Removes a node with the given UUID from the scene and the node map.
 *
 * @param {string} uuid - The unique identifier of the node to be removed.
 * @return Returns true if the node was successfully removed, false if the node does not exist.
 */
  removePoint(uuid: string) {
    const node = this.nodeMap[uuid]
    if (!node) return false
    this.threeObject.scene.remove(node)
    delete this.nodeMap[uuid]
    return true
  }

  /**
     * 增加事件监听器
     * 
     * @param type 事件类型
     * @param callback 回调函数
     * 
     * **注意**
     * - `nodeclick`, `lineclick` 事件会在原生 `mouseup` 事件触发后触发
     */
  addEventListener(type: CoreEvent, callback: (...args: any[]) => void): MapCore {
    this.eventMap[type].add(callback)
    return this
  }

  removeEventListener(type: CoreEvent): MapCore;
  removeEventListener(type: CoreEvent, callback: (...args: any[]) => void): MapCore;
  /**
   * 移除事件监听器
   * 
   * @param type 事件类型
   * @param callback 回调函数
   */
  removeEventListener(type: CoreEvent, callback?: (...args: any[]) => void) {
    if (callback) this.eventMap[type].delete(callback)
    else this.eventMap[type].clear()
    return this
  }

  /**
   * Run on init.
   */
  private _addMouseMoveEvent() { }

  /**
   * Run on init.
   */
  private _addClickEvent() {
    const { camera } = this.threeObject
    // 每次获取时进行更新
    const model = () => Object.values(this.nodeMap)

    var raycaster = new THREE.Raycaster();

    let startX = 0
    let startY = 0

    function onDocumentMouseDown(event: MouseEvent) {
      startX = event.clientX
      startY = event.clientY
    }

    const onDocumentMouseUp = (event: MouseEvent) => {
      // 判断是否是真实点击，而不是点击后移动了鼠标
      if (Math.abs(startX - event.clientX) > 10 || Math.abs(startY - event.clientY) > 10) {
        return
      }

      event.preventDefault();

      var mouseVector = getMouseVector(event);
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects([this.TestNode, ...model()], true); // model 表示要监听点击事件的模型

      if (intersects.length > 0) {
        const node = findNode(intersects)

        if (node) {
          this.eventMap.nodeclick.forEach((callback) => {
            callback(node)
          })
        }
      } else {

      }
    }

    const onContextMenu = (event: MouseEvent) => {
      var mouseVector = getMouseVector(event);
      // raycaster 为共享，可能在未来会出现问题？
      raycaster.setFromCamera(mouseVector, camera);
      // 仅监听背景
      this.eventMap.contextmenu.forEach((callback) => {
        callback(event, raycaster.intersectObjects([this.threeObject.background], true))
      })
    }

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('contextmenu', onContextMenu, false);
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
      background
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
    // controls.mouseButtons.RIGHT = THREE.MOUSE.ROTATE
    controls.mouseButtons.RIGHT = undefined

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
