import { NodeProps, NodeType } from "@/three/types/node"
import * as THREE from 'three'
import NodeCore from "./components/core"
import NodeTitle from "./components/title"
import NodeResource from "./components/resources"

function getSubTitleFromType(type: NodeType) {
  const defaultColor = 0xaaaaaa
  let subTitle = "null"

  switch (type) {
    case "hunt":
      subTitle = "捕猎区"
      break;

    case "encounter":
      subTitle = "奇遇"
      break;

    default:
      break;
  }

  return {
    subTitle,
    subTitleColor: defaultColor
  }
}

function getResouceMoveBySize(size: NodeProps['size']) {
  let moveByX = 0
  let moveByY = 0

  switch (size) {
    case "small":
      moveByX = 4.7
      moveByY = 0.6
      break;

    case "large":
      moveByX = 5.5
      moveByY = 0.8
      break;

    default:
      break;
  }

  return {
    moveByX,
    moveByY
  }
}

function getTitleMoveBySize(size: NodeProps['size']) {
  let moveByX = 0
  let moveByY = 0

  switch (size) {
    case "small":
      moveByX = 2.2
      moveByY = -1.2
      break;

    case "large":
      moveByX = 3
      moveByY = -1
      break;

    default:
      break;
  }

  return {
    moveByX,
    moveByY
  }
}

function changeModelByMoveXY(
  model: THREE.Group,
  {
    moveByX,
    moveByY
  }: {
    moveByX: number,
    moveByY: number
  }
) {
  model.position.x += moveByX
  model.position.y += moveByY
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
    const core = new NodeCore(options)

    const { subTitle, subTitleColor } = getSubTitleFromType(options.type)

    const title = new NodeTitle({
      title: options.name,
      weather: options.weather,
      subTitle, subTitleColor
    })

    changeModelByMoveXY(title, getResouceMoveBySize(options.size))

    const resources = new NodeResource({
      resources: options.resources
    })

    changeModelByMoveXY(resources, getTitleMoveBySize(options.size))

    this.add(
      core,
      title,
      resources
    )
  }
}

export default Node
