import background_img from '@/assets/three/background.avif'
import dungeon from '@/assets/three/dungeon.avif'
import { MapType } from '@/three/types/map'
import * as THREE from 'three'

const Loader = new THREE.TextureLoader()

const textureMap: Partial<Record<MapType, any>> = {}

async function getMapTextureFromType(type: MapType) {
  if (textureMap[type]) return textureMap[type]
  switch (type) {
    case 'main':
      return textureMap[type] = await Loader.loadAsync(background_img)

    default:
      return textureMap[type] = await Loader.loadAsync(dungeon)
  }
}

class Background extends THREE.Group {
  material: THREE.MeshBasicMaterial | null = null
  constructor() {
    super()
    this._init()
  }

  private async _init() {
    const texture = await getMapTextureFromType('main')

    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      map: texture
    })
    this.material = material

    const PlaneBackground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      material
    )

    PlaneBackground.position.set(0, 0, 0)

    this.add(
      PlaneBackground
    )
  }

  /**
   * 修改背景图片
   * 
   * @param type 地图类型
   */
  async changeBackground(type: MapType) {
    const texture = await getMapTextureFromType(type)
    this.material!.map = texture
  }
}

export default Background