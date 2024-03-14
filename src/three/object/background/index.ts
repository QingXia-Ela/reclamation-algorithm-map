import background_img from '@/assets/three/background.avif'
import dungeon from '@/assets/three/dungeon.avif'
import { BackgroundType, MapType } from '@/three/types/map'
import * as THREE from 'three'

const Loader = new THREE.TextureLoader()

const textureMap: Partial<Record<BackgroundType, any>> = {}

async function getBackgroundTextureFromBackgroundType(type: BackgroundType) {
  if (textureMap[type]) return textureMap[type]
  let finalTexture = null

  switch (type) {
    case 'main':
      finalTexture = textureMap[type] = await Loader.loadAsync(background_img)
      break;

    default:
      finalTexture = textureMap[type] = await Loader.loadAsync(dungeon)
      break;
  }

  finalTexture.colorSpace = THREE.SRGBColorSpace

  return finalTexture
}

function translateType2BackgroundType(type: MapType) {
  switch (type) {
    case 'main':
      return 'main'

    default:
      return 'dungeon'
  }
}

async function getMapTextureFromType(type: MapType): Promise<THREE.Texture> {
  return await getBackgroundTextureFromBackgroundType(translateType2BackgroundType(type))
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

  return mainBackground as THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>
}

function getBackgroundSizeByType(type: MapType) {
  let size = 80
  switch (type) {
    case 'dungeon_theif_cap':
      size = 140
      break;

    case 'dungeon_miner_convoy':
      size = 120
      break

    case 'dungeon_boss_hunt':
      size = 160
      break
  }

  return size
}

async function getBackgroundByCustomArg(size = 90, type: BackgroundType) {
  return new THREE.Mesh(
    new THREE.PlaneGeometry(size, size),
    new THREE.MeshBasicMaterial({
      transparent: true,
      map: await getBackgroundTextureFromBackgroundType(type)
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

async function getDungeonBackground(type: MapType) {
  let size = getBackgroundSizeByType(type)
  return await getBackgroundByCustomArg(size, translateType2BackgroundType(type))
}

class Background extends THREE.Group {
  backgroundObj: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null = null
  backgroundSize: number = 200
  mapType: BackgroundType = 'main'
  constructor() {
    super()
    this._init()
  }

  private async _init() {

  }

  _setMetadata(type: MapType) {
    this.backgroundSize = this.backgroundObj!.geometry.parameters.width
    this.mapType = translateType2BackgroundType(type)
  }

  /**
   * 修改背景图片
   * 
   * @param type 地图类型
   */
  async changeBackground(type: MapType) {
    this.remove(this.backgroundObj!)
    const newBg = await getBackgroundByType(type)
    this.backgroundObj = newBg
    this.add(
      newBg
    )
    this._setMetadata(type)
  }

  /**
   * 通过自定义参数修改背景图片
   * 
   * **注意：** 这是一个相对比较底层的 api，一般建议使用 `changeBackground`
   * 
   * @param type 背景类型 - 指的是地图唯一可标识 id
   * @param bgType 背景图片类型
   * @param size 背景大小
   */
  async changeBackgroundByBgType(type: MapType, bgType: BackgroundType, size = 90) {
    this.remove(this.backgroundObj!)
    const newBg = await getBackgroundByCustomArg(size, bgType)
    this.backgroundObj = newBg
    this.add(
      this.backgroundObj
    )
    this._setMetadata(type)
  }
}

export default Background