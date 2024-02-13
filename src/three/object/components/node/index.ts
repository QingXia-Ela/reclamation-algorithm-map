import { NodeProps, NodeType } from "@/three/types/node"
import * as THREE from 'three'
import NodeCore from "./components/core"
import NodeTitle from "./components/title"
import NodeResource from "./components/resources"
import merge from 'lodash/merge'

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

function getTitleMoveBySize(size: NodeProps['size']) {
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

function getResouceMoveBySize(size: NodeProps['size']) {
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
  z = 1
  components: Record<string, THREE.Group> = {}
  options: NodeProps
  constructor(options: NodeProps) {
    super()
    const { x, y } = options
    this.x = x
    this.y = y
    this.options = options

    this.position.set(x, y, this.z)
    this._init(options)
  }

  /**
   * 展示当前节点标题/资源信息
   * 
   * @param animate 是否开启动画
   */
  showInfo(animate?: boolean) {
    if (!animate) {
      this.components.title.visible = true
      this.components.resources.visible = true
    }
  }

  /**
   * 隐藏当前节点标题/资源信息
   * 
   * @param animate 是否开启动画
   */
  hideInfo(animate?: boolean) {
    if (!animate) {
      this.components.title.visible = false
      this.components.resources.visible = false
    }
  }

  /**
   * 更新节点信息
   * 
   * @param newOptions 新的节点配置
   */
  updateNode(newOptions: Partial<NodeProps>) {
    merge(this.options, newOptions)

    Object.values(this.components).forEach(component =>
      this.remove(component)
    )

    this._init(this.options)
  }

  private _getCore(options: NodeProps) {
    return new NodeCore(options)
  }

  private _getNodeTitle({ name: title, weather, type, size }: NodeProps) {
    const { subTitle, subTitleColor } = getSubTitleFromType(type)
    const titleObj = new NodeTitle({
      title,
      weather,
      subTitle,
      subTitleColor
    })

    changeModelByMoveXY(titleObj, getTitleMoveBySize(size))

    return titleObj
  }

  private _getResources({ resources, size }: NodeProps) {
    const resourceObj = new NodeResource({
      resources
    })

    changeModelByMoveXY(resourceObj, getResouceMoveBySize(size))

    return resourceObj
  }

  private _init(options: NodeProps) {
    const core = this._getCore(options)

    const title = this._getNodeTitle(options)

    const resources = this._getResources(options)

    this.components = {
      core,
      title,
      resources
    }

    this.add(
      core,
      title,
      resources
    )
  }
}

export default Node
