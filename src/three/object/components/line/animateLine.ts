import * as THREE from "three"
import Node from "../node"
import vertexShader from "./shader/vertex.glsl?raw"
import fragmentShader from "./shader/fragment.glsl?raw"
import output_fragment from "./shader/output_fragment.glsl?raw"
import { LineAnimateDirection } from "./types"
import MapAnchor from "../../anchor"

export interface AnimateLineOptions {
  x?: number
  y?: number
  rotate?: number
  nodes: Node[]
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
  destnationNodes: THREE.Vector3[] = []
  lineColor: THREE.Color
  bgColor: THREE.Color
  materialUniforms: Record<string, any> = {}
  pointGeometryArray: THREE.Points[] = []

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
      return pos.set(pos.x - x, pos.y - y, 0.2)
    })

    this.lineColor = new THREE.Color(lineColor)
    this.bgColor = new THREE.Color(bgColor)

    this.rotateZ(-rotate)

    this._init()
  }

  _init() {
    const PointCount = 15
    const SingleLinePointCount = 50
    const FullCurve = new THREE.CatmullRomCurve3(
      this.destnationNodes,
      false,
      "centripetal",
      0
    )

    const routePoints = FullCurve.getPoints(SingleLinePointCount * (this.destnationNodes.length - 1))
    const array = new Float32Array(routePoints.length * 3)
    routePoints.forEach((point, index) => {
      array[index * 3] = point.x
      array[index * 3 + 1] = point.y
      array[index * 3 + 2] = point.z
    })

    const colors = new Float32Array(routePoints.length * 3)
    routePoints.forEach((_, index) => {
      colors[index * 3] = this.lineColor.r
      colors[index * 3 + 1] = this.lineColor.g
      colors[index * 3 + 2] = this.lineColor.b
    })
    // const points = new THREE.Points(
    //   new THREE.BufferGeometry().setFromPoints(routePoints),
    //   new THREE.PointsMaterial({
    //     color: this.lineColor,
    //     size: 1,
    //     sizeAttenuation: false
    //   })
    // )
    // console.log(points);
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(array, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(new Float32Array(routePoints.length).fill(1), 1))

    const points = new THREE.Points(geometry)

    function animate() {

    }
    animate()
    console.log(points);
    this.add(points)
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
