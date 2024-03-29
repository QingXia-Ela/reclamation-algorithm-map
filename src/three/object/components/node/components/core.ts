/**
 * 节点核心图标几何体实现
 * 
 * @author QingXia-Ela
 */
import * as THREE from 'three'
import { NormalNodeProps, NodeType } from '@/three/types/node'
import NODE_ASSETS from '@/assets/three/icon/node'
const textureLoader = new THREE.TextureLoader()

function getNodeIconMesh(texture: THREE.Texture) {
  const Obj = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      // 图标颜色
      color: 0x000000
    })
  )

  Obj.position.z += 0.001

  return Obj
}

async function getNodeTextureMapByType(type: NodeType) {
  // @ts-ignore: type will keep same by resource name
  const url = NODE_ASSETS[`NODE_${type.toUpperCase()}`]
  const texture = await textureLoader.loadAsync(url)
  return texture
}

async function getRoundBorder(type: NodeType, size: NormalNodeProps['size']) {
  const RoundBorder = new THREE.Group()

  if (size === "small") RoundBorder.scale.set(0.65, 0.65, 1)

  const WhiteMaterial = new THREE.MeshBasicMaterial({
    color: 0xefefef
  })

  const WhiteMaterialHalfAlpha = new THREE.MeshBasicMaterial({
    color: 0xefefef,
    transparent: true,
    opacity: 0.3
  })

  const OuterRound = new THREE.TorusGeometry(2, 0.14, 2, 100)

  const icon = getNodeIconMesh(await getNodeTextureMapByType(type))

  icon.scale.set(0.9, 0.9, 1)

  RoundBorder.add(
    getNodeIconMesh(await getNodeTextureMapByType(type)),
    new THREE.Mesh(
      new THREE.CircleGeometry(1.6, 32),
      WhiteMaterial
    ),
    new THREE.Mesh(
      OuterRound,
      WhiteMaterialHalfAlpha
    )
  )

  return RoundBorder
}

async function getSquareBorder(type: NodeType, size: NormalNodeProps['size']) {
  const group = new THREE.Group()

  if (size === "large") group.scale.set(1.4, 1.4, 1)

  const InnerSquare = new THREE.Mesh(
    new THREE.PlaneGeometry(2.1, 2.1),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  )

  const OuterBorder = new THREE.Mesh(
    new THREE.TorusGeometry(1.7, 0.08, 2, 4),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      color: 0xefefef
    })
  )

  OuterBorder.rotateZ(Math.PI / 4)

  const icon = getNodeIconMesh(await getNodeTextureMapByType(type))

  icon.scale.set(0.9, 0.9, 1)

  group.add(
    icon,
    InnerSquare,
    OuterBorder
  )

  return group
}

async function getHexagonBorder(type: NodeType, size: NormalNodeProps['size']) {
  const group = new THREE.Group()

  if (size === "small") group.scale.set(0.65, 0.65, 1)

  const InnerSquare = new THREE.Mesh(
    new THREE.CircleGeometry(2, 6),
    new THREE.MeshBasicMaterial({
      color: 0xffffff
    })
  )

  InnerSquare.rotateZ(Math.PI / 6)

  const OuterBorder = new THREE.Mesh(
    new THREE.TorusGeometry(2.3, 0.08, 2, 6),
    new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.5,
      color: 0xefefef
    })
  )

  OuterBorder.rotateZ(Math.PI / 6)

  const icon = getNodeIconMesh(await getNodeTextureMapByType(type))

  group.add(
    icon,
    InnerSquare,
    OuterBorder
  )

  return group
}

function getBorderFunc(border: NormalNodeProps['border']) {
  switch (border) {
    case "round":
      return getRoundBorder
    case "hexagon":
      return getHexagonBorder
  }
  return getSquareBorder
}

interface NodeCoreProps {
  type: NodeType,
  border: NormalNodeProps['border'],
  size: NormalNodeProps['size']
}

class NodeCore extends THREE.Group {
  /**
   * 图标 SVG 位于 children 第一位
   * 
   * 背景第二位，外边框第三位
   */
  icon: THREE.Group | null
  /**
   * 任务队列，保存在初始化完成后要执行的行为
   */
  taskQueue: Array<() => any> = []
  constructor(options: NodeCoreProps) {
    super()
    this.icon = null

    this._init(options)
  }

  /**
   * 修改边框样式
   * 
   * @param color 要修改的颜色
   * @param opacity 要修改的透明度
   */
  changeBorderStyle(color = 0xefefef, opacity = 0.5) {
    // todo!: 优化补丁代码
    if (this.icon) {
      // @ts-ignore: 直接修改材质颜色
      // 所有外边框材质均位于第 3 个位置
      const material = this.icon.children[2].material as THREE.MeshBasicMaterial
      material.color.set(color)
      material.opacity = opacity
    }

    return this
  }

  /**
   * 修改内部核心颜色
   * 
   * 建议高亮时图标为白，背景与地图呈现高对比度
   * 
   * @param bgColor 背景颜色
   * @param iconColor 图标颜色
   */
  changeContentColor(bgColor = 0xefefef, iconColor = 0x000000) {
    if (this.icon) {
      // @ts-ignore: 直接修改材质颜色
      const iconMaterial = this.icon.children[0].material as THREE.MeshBasicMaterial
      // @ts-ignore: 直接修改材质颜色
      const bgMaterial = this.icon.children[1].material as THREE.MeshBasicMaterial

      bgMaterial.color.set(bgColor)
      bgMaterial.needsUpdate = true
      iconMaterial.color.set(iconColor)
      iconMaterial.needsUpdate = true
    }
    // 推入任务队列，等待初始化完成后全部执行
    else {
      this.taskQueue.push(() => this.changeContentColor(bgColor, iconColor))
    }
    return this
  }

  private async _init({
    type,
    border,
    size
  }: NodeCoreProps) {
    const icon = await getBorderFunc(border)(type, size)

    this.icon = icon

    this.add(icon)

    // 执行延时任务
    setTimeout(() => {
      this.taskQueue.forEach(v => v())
    });
  }
}

export default NodeCore