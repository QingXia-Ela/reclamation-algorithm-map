import background_img from '@/assets/three/background.avif'
import * as THREE from 'three'

class Background extends THREE.Group {
  constructor() {
    super()
    this._init()
  }

  private async _init() {
    const texture = await new THREE.TextureLoader().loadAsync(background_img)

    const PlaneBackground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({
        transparent: true,
        map: texture
      })
    )

    PlaneBackground.position.set(0, 0, 0)

    this.add(
      PlaneBackground
    )
  }
}

export default Background