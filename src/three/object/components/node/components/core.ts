/**
 * 节点核心图标几何体实现
 * 
 * @author QingXia-Ela
 */
import * as THREE from 'three'
import { NodeType } from '@/three/types/node'
import * as NODE_ASSETS from '../assets'
const textureLoader = new THREE.TextureLoader()

class NodeCore extends THREE.Group {
  constructor({
    type
  }: {
    type: NodeType
  }) {
    super()

    this._init({
      type
    })
  }

  private async _getNodeTextureMapByType(type: NodeType) {
    // @ts-ignore: type will keep same by resource name
    const url = NODE_ASSETS[`NODE_${type.toUpperCase()}`]
    const texture = await textureLoader.loadAsync(url)
    return texture
  }

  private _getNodeIconMesh(texture: THREE.Texture) {
    const Obj = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0x000000
      })
    )

    Obj.scale.set(0.9, 0.9, 1)

    Obj.position.z += 0.001

    return Obj
  }

  private async _getRoundBorder(type: NodeType) {
    const WhiteMaterial = new THREE.MeshBasicMaterial({
      color: 0xefefef
    })

    const WhiteMaterialHalfAlpha = new THREE.MeshBasicMaterial({
      color: 0xefefef,
      transparent: true,
      opacity: 0.3
    })

    const OuterRound = new THREE.TorusGeometry(2, 0.14, 2, 100)

    const RoundBorder = new THREE.Group()

    RoundBorder.add(
      this._getNodeIconMesh(await this._getNodeTextureMapByType(type)),
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

  private async _init({
    type
  }: {
    type: NodeType
  }) {
    // const border = await this.textureLoader.loadAsync(border_square_small)
    // const icon = null

    // const material = new THREE.MeshBasicMaterial({ map: border })

    // const PlaneBottom = new THREE.Mesh(
    //   new THREE.PlaneGeometry(1, 1),
    //   material
    // )

    this.add(await this._getRoundBorder(type))
  }
}

export default NodeCore