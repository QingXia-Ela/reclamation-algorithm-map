import * as THREE from "three"
import Node from "../node"
import vertexShader from "./shader/vertex.glsl?raw"
import fragmentShader from "./shader/fragment.glsl?raw"
import output_fragment from "./shader/output_fragment.glsl?raw"
import { LineAnimateDirection } from "./types"

export interface AnimateLineOptions {
  start: Node
  end: Node
  len: number
  centerPosition: THREE.Vector3
  rotate: number
  direction: LineAnimateDirection
  lineColor: number
  bgColor: number
}

function getAnimateLineMaterial(option: ConstructorParameters<typeof THREE.ShaderMaterial>[0] = {}) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    ...option
  })
}

function getAnimateMaterialUniform(
  lineColor: number
) {
  const uniforms: Record<string, any> = {
    u_color: {
      value: new THREE.Color(lineColor)
    },
    u_precentage: {
      value: 0
    },
    u_size: {
      value: 1
    },
    u_range: {
      value: 0
    },
    u_total: {
      value: 1
    }
  }

  return uniforms
}

class AnimateLine extends THREE.Group {
  start: Node
  end: Node
  len: number
  centerPosition: THREE.Vector3
  rotate: number
  direction: LineAnimateDirection
  lineColor: THREE.Color
  bgColor: THREE.Color
  materialUniforms: Record<string, any> = {}

  constructor({
    start,
    end,
    len,
    centerPosition,
    direction,
    lineColor,
    bgColor,
    rotate
  }: AnimateLineOptions) {
    super()

    this.start = start
    this.end = end
    this.len = len
    this.centerPosition = centerPosition
    this.rotate = rotate
    this.direction = direction
    this.lineColor = new THREE.Color(lineColor)
    this.bgColor = new THREE.Color(bgColor)

    this._init()
  }

  _init() {
    let index = 0
    let num = 15
    /** --- */
    const curve = new THREE.CatmullRomCurve3([
      this.start.position,
      this.end.position
    ])
    const points = curve.getPoints(100);
    let pointsSlice = points.slice(index, num);
    const flyPointsCurve = new THREE.CatmullRomCurve3(pointsSlice).getSpacedPoints(100)

    /** --- */
    const geometry = new THREE.BufferGeometry().setFromPoints(curve.getSpacedPoints(100));
    const uniforms = getAnimateMaterialUniform(this.lineColor.getHex())
    this.materialUniforms = uniforms
    // const line = new THREE.Mesh(geometry, getAnimateLineMaterial({
    //   uniforms
    // }))

    /** --- */
    const prcentArr = []
    for (let i = 0; i < 101; i++) {
      prcentArr.push(i / 101)
    }
    const precentAttr = new THREE.BufferAttribute(new Float32Array(prcentArr), 1)
    geometry.setAttribute('a_precentage', precentAttr)

    /** --- */
    const colorArr = [];
    for (let i = 0; i < 101; i++) {
      const res = this.bgColor.clone().lerp(this.lineColor, i / 101)
      colorArr.push(
        res.r,
        res.g,
        res.b
      )
    }
    const colorAttr = new THREE.BufferAttribute(new Float32Array(colorArr), 1)
    geometry.setAttribute('a_color', colorAttr)

    /** --- */
    const pointsMaterial = new THREE.PointsMaterial({
      size: 0.1,
      vertexColors: true,
      transparent: true,
      depthTest: false,
    })
    const flyPoints = new THREE.Points(geometry, new THREE.PointsMaterial({
      color: 0xffff00,
      transparent: true,
      opacity: 0.6
    }))
    pointsMaterial.onBeforeCompile = function (shader) {
      // 顶点着色器中声明一个attribute变量:百分比
      shader.vertexShader = shader.vertexShader.replace(
        'void main() {',
        [
          'attribute float a_precentage;', //顶点大小百分比变量，控制点渲染大小
          'void main() {',
        ].join('\n') // .join()把数组元素合成字符串
      );
      // 调整点渲染大小计算方式
      shader.vertexShader = shader.vertexShader.replace(
        'gl_PointSize = size;',
        [
          'gl_PointSize = a_precentage * size;',
        ].join('\n') // .join()把数组元素合成字符串
      );

      shader.fragmentShader = shader.fragmentShader.replace('#include <output_fragment>', output_fragment);
    }

    /** --- */
    var indexMax = points.length - num; //飞线取点索引范围
    function animation() {
      if (index > indexMax) index = 0;
      index += 1
      pointsSlice = points.slice(index, index + num); //从曲线上获取一段
      var curve = new THREE.CatmullRomCurve3(pointsSlice);
      var newPoints2 = curve.getSpacedPoints(100); //获取更多的点数
      geometry.setFromPoints(newPoints2);

      requestAnimationFrame(animation);
    }

    // animation()

    /** --- */
    // flyPoints.position.setX(this.centerPosition.x)
    // flyPoints.position.setY(this.centerPosition.y)
    this.add(flyPoints)
    this.position.setZ(0.15)
    // if (__DEV__) this.setPrecentage(0.5)
  }

  _line_init() { }

  setPrecentage(per: number) {
    this.materialUniforms.u_precentage.value = per
  }

  updateLine() {
    this._init()
  }
}

export default AnimateLine
