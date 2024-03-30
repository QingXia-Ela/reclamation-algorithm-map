import * as THREE from "three"
import Node from "../node"

export enum LineAnimateDirection {
  Node1_Node2 = 1,
  Node2_Node1 = 2
}

export interface LineProps {
  node1: Node
  node2: Node
  x1: number
  y1: number
  x2: number
  y2: number
}

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function getLineMiddlePoint(x1: number, y1: number, x2: number, y2: number) {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2
  }
}

function getLineRotateAngle(x1: number, y1: number, x2: number, y2: number) {
  return Math.atan2(y2 - y1, x2 - x1) + Math.PI / 2
}

class Line extends THREE.Group {
  x1: number
  y1: number
  x2: number
  y2: number

  node1: Node
  node2: Node

  width = .2

  z = .01

  threeObject: Record<string, any> = {}
  animateFnMap: Record<string, any> = {}

  constructor({
    x1,
    y1,
    x2,
    y2,
    node1,
    node2
  }: LineProps) {
    super()

    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2

    this.node1 = node1
    this.node2 = node2

    this._init()
  }

  private _init() {
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.6
    });

    const geometry = new THREE.PlaneGeometry(this.width, calculateDistance(this.x1, this.y1, this.x2, this.y2));
    const line = new THREE.Mesh(geometry, material);

    this.threeObject = {
      material,
      geometry,
      line
    }

    const { x, y } = getLineMiddlePoint(this.x1, this.y1, this.x2, this.y2)
    this.position.set(x, y, this.z)
    this.rotateZ(getLineRotateAngle(this.x1, this.y1, this.x2, this.y2))
    this.add(line);
  }

  _start_animate() { }

  setLineStyle(style: THREE.MeshBasicMaterialParameters) {
    const material = new THREE.MeshBasicMaterial(style)
    this.threeObject.material = material
    this.threeObject.line.material = material
  }

  setLineColor(color: number) {
    // line 引用相同的 material，修改一个即可
    this.threeObject.material.color.set(color)
  }

  setLineDirectionAnimate(animate: boolean, color = 0xff0000, LineAnimateDirection?: LineAnimateDirection) {
    if (animate) {

    } else { }
  }

  setPosition(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }

  getProps() {
    return {
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2,
      node1: this.node1,
      node2: this.node2
    }
  }
}

export default Line