import { NodeProps } from "@/three/types/node"
import * as THREE from 'three'
import NodeCore from "./components/core"

class Node extends THREE.Group {
  x: number
  y: number
  constructor(options: NodeProps) {
    super()
    const { x, y } = options
    this.x = x
    this.y = y

    this._init(options)
  }

  private _init(options: NodeProps) {
    this.position.setZ(2)
    const core = new NodeCore({
      type: options.type
    })

    this.add(
      core
    )
  }
}

export default Node
