/**
 * 节点核心图标几何体实现
 * 
 * @author QingXia-Ela
 */
import * as THREE from 'three'
import { NodeProps, NodeType } from '@/three/types/node'
import NODE_ASSETS from '../assets/node'
const textureLoader = new THREE.TextureLoader()

function getNodeIconMesh(texture: THREE.Texture) {
  const Obj = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
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

async function getRoundBorder(type: NodeType, size: NodeProps['size']) {
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
      new THREE.CircleGeometry(1.75, 32),
      WhiteMaterialHalfAlpha
    ),
    new THREE.Mesh(
      OuterRound,
      WhiteMaterialHalfAlpha
    )
  )

  return RoundBorder
}

async function getSquareBorder(type: NodeType, size: NodeProps['size']) {
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

async function getHexagonBorder(type: NodeType, size: NodeProps['size']) {
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

function getBorderFunc(border: NodeProps['border']) {
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
  border: NodeProps['border'],
  size: NodeProps['size']
}

class NodeCore extends THREE.Group {
  constructor(options: NodeCoreProps) {
    super()

    this._init(options)
  }

  private async _init({
    type,
    border,
    size
  }: NodeCoreProps) {
    // const border = await this.textureLoader.loadAsync(border_square_small)
    // const icon = null

    // const material = new THREE.MeshBasicMaterial({ map: border })

    // const PlaneBottom = new THREE.Mesh(
    //   new THREE.PlaneGeometry(1, 1),
    //   material
    // )

    this.add(await getBorderFunc(border)(type, size))
  }
}

export default NodeCore