import { NodeProps } from "@/three/types/node"
import * as THREE from 'three'
import NodeCore from "./components/core"

class Node extends THREE.Group {
  x: number
  y: number
  constructor({
    x, y
  }: NodeProps) {
    super()
    this.x = x
    this.y = y

    this._init()
  }

  private _init() {
    this.position.setZ(2)
    const core = new NodeCore()

    this.add(
      core
    )
  }
}

export default Node
