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

let mainBackground: THREE.Mesh | null = null

async function getMainBackground() {
  if (!mainBackground) {
    mainBackground = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshBasicMaterial({
        transparent: true,
        map: await getMapTextureFromType('main')
      })
    )
  }

  return mainBackground
}

async function getDungeonBackground(type: MapType) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(80, 80),
    new THREE.MeshBasicMaterial({
      transparent: true,
      map: await getMapTextureFromType(type)
    })
  )
}

async function getBackgroundByType(type: MapType) {
  switch (type) {
    case 'main':
      return getMainBackground()

    default:
      return getDungeonBackground(type)
  }
}

class Background extends THREE.Group {
  backgroundObj: THREE.Mesh | null = null
  constructor() {
    super()
    this._init()
  }

  private async _init() {

    const PlaneBackground = await getMainBackground()

    PlaneBackground.position.set(0, 0, 0)

    this.backgroundObj = PlaneBackground

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
    this.remove(this.backgroundObj!)
    this.backgroundObj = await getBackgroundByType(type)
    this.add(
      this.backgroundObj
    )
  }
}

export default Background