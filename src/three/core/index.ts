import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Node from '../object/components/node';
import Background from '../object/background';
import findNode from '../utils/findNode';
import { NodeProps } from '../types/node';
import Line from '../object/components/line';
import { SaveMapData } from '../types/data';
import DataStructHandle from '../core/DataStrcutHandle';
import { BSCShader } from '@/three/effect/BSCShader'
import { EffectComposer, FXAAShader, RenderPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import * as TWEEN from '@tweenjs/tween.js'
import findLine from '../utils/findLine';

type CoreEvent = "nodeclick" | "lineclick" | 'contextmenu' | 'mousemove'

function getMouseVector(event: MouseEvent) {
  const mouseVector = new THREE.Vector2((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1);
  return mouseVector
}

const InnerNode: NodeProps[] = [
  {
    nodeId: -1,
    preset: "base",
    x: -5,
    y: 8.5
  }
]

// todo!: 增加一个随鼠标点击移动的高亮小坐标
class MapCore {
  threeObject: Record<string, any> = {}
  eventMap = {
    nodeclick: new Set<(node: Node) => void>(),
    lineclick: new Set<(line: Line) => void>(),
    contextmenu: new Set<(event: MouseEvent, intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) => void>(),
    mousemove: new Set(),
  }
  DataHandle = new DataStructHandle()
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
    const node = this.DataHandle.addNode(options)
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
    return this.DataHandle.getNodeByUUID(uuid)
  }

  /**
   * Retrieves a point using its node ID.
   *
   * @param {number} nodeId - The ID of the point to retrieve.
   * @return The point corresponding to the node ID.
   */
  getPointByNodeId(nodeId: number) {
    return this.DataHandle.getNodeByID(nodeId)
  }

  /**
 * Removes a node with the given UUID from the scene and the node map.
 *
 * @param {string} uuid - The unique identifier of the node to be removed.
 * @return Returns true if the node was successfully removed, false if the node does not exist.
 */
  removePoint(uuid: string) {
    const res = this.DataHandle.removeNodeByUUID(uuid)
    if (res) {
      const { node, edges } = res
      this.threeObject.scene.remove(node)
      edges.forEach(edge => {
        this.threeObject.scene.remove(edge)
      })
    }
    return !!res
  }

  /**
   * Removes a node with the given node ID from the scene and the node map.
   *
   * @param {number} nodeId - The ID of the node to be removed.
   * @return Returns true if the node was successfully removed, false if the node does not exist.
   */
  removePointByNodeId(nodeId: number) {
    const node = this.DataHandle.removeNodeById(nodeId)
    this.threeObject.scene.remove(node)
    return !!node
  }

  /**
   * Removes all nodes and relative edges from the scene and the node map.
   * 
   * **Note**: This method is really dangerous, unless you know what you are doing.
   */
  removeAllPoint() {
    const data = this.DataHandle.removeAllObjs()
    Object.values(data).forEach(data => {
      Object.values(data).forEach((obj: Node | Line) => {
        this.threeObject.scene.remove(obj)
      })
    })
  }

  /**
   * 从序列化数据加载整张地图
   * 
   * @param data 地图数据
   * @returns 错误信息，如果为空表示加载成功
   */
  loadData(data: SaveMapData) {
    try {
      const res = this.DataHandle.loadData(data)
      Object.values(res).forEach(data => {
        Object.values(data).forEach((obj: Node | Line) => {
          this.threeObject.scene.remove(obj)
        })
      })
      // 新场景，添加新的节点与边
      Object.values(this.DataHandle.nodeMap).forEach(node => {
        this.threeObject.scene.add(node)
      })
      Object.values(this.DataHandle.edges).forEach(edge => {
        this.threeObject.scene.add(edge)
      })
    } catch (e) {
      console.error(e);
      return e
    }
  }

  addEdgeByNodeIds(sourceId: number, targetId: number) {
    const line = this.DataHandle.addEdge(sourceId, targetId)
    this.threeObject.scene.add(line)
  }

  removeEdgeByUUID(uuid: string) {
    const line = this.DataHandle.removeEdgeByUUID(uuid)
    this.threeObject.scene.remove(line)
    return !!line
  }

  removeEdgeByNodeIds(sourceId: number, targetId: number) {
    const line = this.DataHandle.removeEdgeByNodeId(sourceId, targetId)
    this.threeObject.scene.remove(line)
    return !!line
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
   * 设置相机位置
   */
  // todo!: 重构这坨
  setCameraPosition(pos: { x: number, y: number, z?: number }, animate = true, duration = 300) {
    const { x, y, z = 20 } = this.threeObject.camera.position
    const controls = (this.threeObject.controls as OrbitControls)
    if (animate) {
      new TWEEN.Tween({ x, y, z })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to(pos, duration)
        .onStart(() => {
          controls.enabled = false
        })
        .onUpdate(({ x, y, z }) => {
          this.threeObject.camera.position.set(x, y, z);
          controls.target.set(x, y, 0);
        })
        .onComplete(() => {
          controls.enabled = true
        })
        .start()

      function animateFrame(time: any) {
        var id = requestAnimationFrame(animateFrame)
        var result = TWEEN.update(time)
        if (!result) cancelAnimationFrame(id)
      }

      animateFrame(performance.now())
    }
    else {
      (this.threeObject.camera as THREE.PerspectiveCamera).position.set(pos.x, pos.y, pos.z || 20)
    }
  }

  /**
   * Run on init.
   */
  // todo!
  private _addMouseMoveEvent() { }

  /**
   * @deprecated - todo!
   */
  private _onWindowResise() { }

  /**
   * Run on init.
   */
  // todo!: 改造为纯函数并从类独立出去
  private _addClickEvent() {
    const { camera } = this.threeObject
    // 每次获取时进行更新
    const model = () => Object.values(this.DataHandle.nodeMap)

    var raycaster = new THREE.Raycaster();

    let startX = 0
    let startY = 0

    function onDocumentMouseDown(event: MouseEvent) {
      startX = event.clientX
      startY = event.clientY
    }

    const onDocumentMouseUp = (event: MouseEvent) => {
      // 屏蔽右键点击
      if (event.button === 2) return
      // 判断是否是真实点击，而不是点击后移动了鼠标
      if (Math.abs(startX - event.clientX) > 10 || Math.abs(startY - event.clientY) > 10) {
        return
      }

      event.preventDefault();

      var mouseVector = getMouseVector(event);
      raycaster.setFromCamera(mouseVector, camera);

      var intersects = raycaster.intersectObjects(model(), true); // model 表示要监听点击事件的模型

      if (intersects.length > 0) {
        const node = findNode(intersects)

        if (node) {
          // nodeclick 实现
          this.eventMap.nodeclick.forEach((callback) => {
            callback(node)
          })

          return
        }

        const line = findLine(intersects)

        if (line) {
          // lineclick 实现
          this.eventMap.lineclick.forEach((callback) => {
            callback(line)
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

  // todo!: composer 作为开关可以实时调整
  private _init() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const background = new Background()
    scene.add(background)

    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));

    // 添加内置节点
    InnerNode.forEach((node) => {
      this.DataHandle.addNode(node)
    })

    const effect = new ShaderPass(BSCShader);
    const FXAAPass = new ShaderPass(FXAAShader);
    // `.getPixelRatio()`获取`renderer.setPixelRatio()`设置的值
    const pixelRatio = renderer.getPixelRatio();//获取设备像素比 
    // width、height是canva画布的宽高度
    FXAAPass.uniforms.resolution.value.x = 1 / (window.innerWidth * pixelRatio);
    FXAAPass.uniforms.resolution.value.y = 1 / (window.innerHeight * pixelRatio);

    composer.addPass(effect);
    composer.addPass(FXAAPass);

    this.threeObject = {
      scene,
      camera,
      renderer,
      background,
      composer
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

    this.threeObject.controls = controls;
  }

  // now only support 2d
  private _addOrbitControls() {
    const { camera, renderer } = this.threeObject
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enableRotate = false

    controls.maxDistance = 60
    controls.minDistance = 20
    controls.maxTargetRadius = 100

    // mobile control
    controls.touches = {
      ONE: THREE.TOUCH.PAN,
      TWO: THREE.TOUCH.DOLLY_PAN
    }

    controls.mouseButtons.LEFT = THREE.MOUSE.PAN
    // right button will add context menu, so disable here
    controls.mouseButtons.RIGHT = undefined
    this.threeObject.controls = controls
  }

  private _startAnimate() {
    const { controls, composer, renderer, scene, camera } = this.threeObject
    const animate = () => {
      controls?.update();
      // composer.render();
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
