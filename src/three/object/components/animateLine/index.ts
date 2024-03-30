import * as THREE from "three"
import Node from "../node"
import vertexShader from "./shader/vertex.glsl?raw"
import fragmentShader from "./shader/fragment.glsl?raw"
import output_fragment from "./shader/output_fragment.glsl?raw"
import { LineAnimateDirection } from "./types"
import * as TWEEN from "@tweenjs/tween.js"

export interface AnimateLineOptions {
  x?: number
  y?: number
  rotate?: number
  nodes: Node[]
  direction: LineAnimateDirection
  lineColor: number
  bgColor: number
}

let currentCache = -1

function changeColorArray(current: number, colorArray: Float32Array, primary: THREE.Color, bg: THREE.Color) {
  if (current === currentCache) return
  currentCache = current
  for (let i = 0; i < 40; ++i) {
    const color = primary.clone().lerp(bg, 1 - (i / 40))
    const base = (i + current) * 3
    colorArray[base] = color.r
    colorArray[base + 1] = color.g
    colorArray[base + 2] = color.b
  }
}

class AnimateLine extends THREE.Group {
  destnationNodes: THREE.Vector3[] = []
  lineColor: THREE.Color
  bgColor: THREE.Color
  materialUniforms: Record<string, any> = {}
  colorArray: Float32Array = new Float32Array(0)
  routePoints: THREE.Vector3[] = []
  points!: THREE.Points
  pointsMaterial: THREE.PointsMaterial = new THREE.PointsMaterial({
    size: 0.13,
    transparent: true,
    vertexColors: true,
  });
  timer: number = 0

  constructor({
    x = 0,
    y = 0,
    rotate = 0,
    nodes,
    lineColor,
    bgColor,
  }: AnimateLineOptions) {
    super()
    this.destnationNodes = nodes.map(node => {
      const pos = node.position.clone()
      return pos.set(pos.x - x, pos.y - y, 0.05)
    })

    this.lineColor = new THREE.Color(lineColor)
    this.bgColor = new THREE.Color(bgColor)

    this.rotateZ(-rotate)

    this._initMaterial()
    this._init()
  }

  _initMaterial() {
    this.pointsMaterial.onBeforeCompile = (shader) => {
      // 顶点着色器中声明一个attribute变量:百分比
      // shader.vertexShader = shader.vertexShader.replace(
      //   'void main() {',
      //   [
      //     'attribute float a_precentage;', //顶点大小百分比变量，控制点渲染大小
      //     'void main() {',
      //   ].join('\n') // .join()把数组元素合成字符串
      // );
      // // 调整点渲染大小计算方式
      // shader.vertexShader = shader.vertexShader.replace(
      //   'gl_PointSize = size;',
      //   [
      //     'gl_PointSize = a_precentage * size;',
      //   ].join('\n') // .join()把数组元素合成字符串
      // );
      // shader.fragmentShader = shader.fragmentShader.replace(
      //   "#include <output_fragment>",
      //   output_fragment
      // )
    }
  }

  _init() {
    const PointCount = 15
    const routePoints: THREE.Vector3[] = []

    for (let i = 0; i < this.destnationNodes.length - 1; ++i) {
      const n1 = this.destnationNodes[i]
      const n2 = this.destnationNodes[i + 1]
      const curve = new THREE.LineCurve3(
        n1, n2
      )
      routePoints.push(...curve.getPoints(
        // 该距离为生产环境下最大放大时仍能保持较理想的视觉效果
        n1.distanceTo(n2) * 10
      ))
    }

    const array = new Float32Array(routePoints.length * 3)
    routePoints.forEach((point, index) => {
      array[index * 3] = point.x
      array[index * 3 + 1] = point.y
      array[index * 3 + 2] = point.z
    })

    const colors = new Float32Array(routePoints.length * 3)
    // 初始化为背景颜色
    const { r, g, b } = this.bgColor;
    routePoints.forEach((_, index) => {
      colors[index * 3] = r;
      colors[index * 3 + 1] = g;
      colors[index * 3 + 2] = b;
    })
    this.colorArray = colors

    const prcentArr = []
    for (let i = 0; i < routePoints.length; i++) {
      prcentArr.push(i / routePoints.length)
    }
    const precentAttr = new THREE.BufferAttribute(new Float32Array(prcentArr), 1)

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(array, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('a_precentage', precentAttr)

    const points = new THREE.Points(geometry, this.pointsMaterial)

    this.routePoints = routePoints
    this.points = points
    this._run_animate();
    this.add(points)
  }

  _run_animate() { }
  // todo!: optimize this shit
  _trigger() {
    let end = false
    const t = new TWEEN.Tween({
      value: 0
    }).to({
      value: this.routePoints.length
    }, this.routePoints.length * 15).onComplete(() => {
      end = true
    }).onUpdate(({ value }) => {
      changeColorArray(
        parseInt(value as unknown as string),
        this.points.geometry.getAttribute('color').array as any,
        this.lineColor,
        this.bgColor
      )
    }).start()

    const animate = () => {
      t.update()
      this.points.geometry.getAttribute('color').needsUpdate = true
      if (!end) {
        requestAnimationFrame(animate)
      }
    }
    animate()
  }

  startAnimate() {
    if (!this.timer) {
      this._trigger()
      this.timer = setInterval(() => {
        this._trigger()
      }, 3000) as unknown as number
    }
  }

  stopAnimate() {
    clearInterval(this.timer)
  }

  drop() {

  }

  _line_init() { }

  /**
   * @param per 0~1 support float.
   */
  setPrecentage(per: number) {
    this.materialUniforms.u_precentage.value = per
  }

  updateLine() {
    this._init()
  }
}

export default AnimateLine
