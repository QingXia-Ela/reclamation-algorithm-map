import { NodeProps, NodeType } from "@/three/types/node"
import * as THREE from 'three'
import NodeCore from "./components/core"
import NodeTitle from "./components/title"
import NodeResource from "./components/resources"

function getSubTitleFromType(type: NodeType) {
  return {
    subTitle: "null",
    subTitleColor: 0xaaaaaa
  }
}

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

    const { subTitle, subTitleColor } = getSubTitleFromType(options.type)

    const title = new NodeTitle({
      title: options.name,
      subTitle, subTitleColor
    })

    const resources = new NodeResource({
      resources: [
        "water"
      ]
    })
    resources.position.x += 3
    resources.position.y -= 1

    this.add(
      core,
      title,
      resources
    )
  }
}

export default Node
