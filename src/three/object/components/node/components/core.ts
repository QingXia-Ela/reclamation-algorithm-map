import * as THREE from 'three'
import border_square_small from '@/assets/three/components/node/border_square_small.png?inline'

class NodeCore extends THREE.Group {
  textureLoader = new THREE.TextureLoader()
  constructor() {
    super()

    this._init()
  }

  private async _getRoundBorder() {
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

  private async _init() {
    // const border = await this.textureLoader.loadAsync(border_square_small)
    // const icon = null

    // const material = new THREE.MeshBasicMaterial({ map: border })

    // const PlaneBottom = new THREE.Mesh(
    //   new THREE.PlaneGeometry(1, 1),
    //   material
    // )

    this.add(await this._getRoundBorder())
  }
}

export default NodeCore