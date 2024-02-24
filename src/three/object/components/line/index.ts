import * as THREE from "three"
import Node from "../node"

interface LineProps {
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
      color: 0xeeeeee,
      transparent: true,
      opacity: 0.7
    });

    const geometry = new THREE.PlaneGeometry(this.width, calculateDistance(this.x1, this.y1, this.x2, this.y2));
    const line = new THREE.Mesh(geometry, material);

    const { x, y } = getLineMiddlePoint(this.x1, this.y1, this.x2, this.y2)
    this.position.set(x, y, this.z)
    this.rotateZ(getLineRotateAngle(this.x1, this.y1, this.x2, this.y2))
    this.add(line);
  }

  setPosition(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}

export default Line