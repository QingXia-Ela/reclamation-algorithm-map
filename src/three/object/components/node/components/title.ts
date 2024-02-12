import { NodeWeather } from "@/three/types/node"
import * as THREE from 'three'
import createBoxWithRoundedEdges from "@/three/utils/createBoxWithRoundedEdges"
import * as WEATHER_ASSETS from "../assets/weather"
import { TextGeometry } from "three/examples/jsm/Addons.js"
import { SourceHanSansCN_Regular } from "@/three/fonts"

interface NodeTitleProps {
  title: string
  subTitle: string
  subTitleColor?: number
  weather?: NodeWeather
}

const textureLoader = new THREE.TextureLoader()

function getWeatherIconColorByWeatherType(weather: NodeWeather) {
  return 0xffffff
}

class NodeTitle extends THREE.Group {
  constructor(options: NodeTitleProps) {
    super()

    this._init(options)
  }

  private _getBackgroundMesh() {
    const geometry = createBoxWithRoundedEdges(6.5, 1.6, 0.2, 0.1)

    const mesh = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({
        color: 0x111111,
        transparent: true,
        opacity: 0.6
      })
    )

    return mesh
  }

  private async _getWeatherTexture(weather: NodeWeather) {
    // @ts-ignore: weather will keep same by resource name
    const url = WEATHER_ASSETS[`WEATHER_${weather.toUpperCase()}`]
    const texture = await textureLoader.loadAsync(url)
    return texture
  }

  private _getWeatherIconMesh(texture: THREE.Texture, color = 0xffffff) {
    const width = 1.2
    const height = width * texture.image.height / texture.image.width
    const Obj = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      // todo!: 处理材质在相机旋转时闪烁的问题（生产环境不影响）
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        opacity: 0.5,
        color,
      })
    )

    return Obj
  }

  private async _getWeahterMesh(weather: NodeWeather) {
    const texture = await this._getWeatherTexture(weather)

    const icon = this._getWeatherIconMesh(texture, getWeatherIconColorByWeatherType(weather))
    icon.position.z += 0.1

    const bg = new THREE.Mesh(
      createBoxWithRoundedEdges(1.4, 1.4, 0.2, 0.1),
      new THREE.MeshBasicMaterial({
        color: 0x666666,
      })
    )

    const group = new THREE.Group()

    group.add(icon, bg)

    return group
  }

  private _getTitle(typeTitle: string, subTitle: string, subTitleColor: number) {
    const subTitleMesh = new THREE.Mesh(
      new TextGeometry(subTitle, {
        font: SourceHanSansCN_Regular,
        size: 0.4,
        height: 0.01
      }),
      new THREE.MeshBasicMaterial({
        color: subTitleColor
      })
    )
    subTitleMesh.position.y += 0.16

    const title = new THREE.Mesh(
      new TextGeometry(typeTitle, {
        font: SourceHanSansCN_Regular,
        size: 0.44,
        height: 0.01
      }),
      new THREE.MeshBasicMaterial({
        color: 0xffffff
      })
    )
    title.position.y -= 0.55

    const group = new THREE.Group()

    group.add(title, subTitleMesh)

    return group
  }

  private async _init({
    title, subTitle, subTitleColor = 0xaaaaaa, weather = "normal"
  }: NodeTitleProps) {
    const weatherMesh = await this._getWeahterMesh(weather)
    weatherMesh.position.x -= 2.35

    const titleMesh = this._getTitle(title, subTitle, subTitleColor)
    titleMesh.position.x -= 1.5
    titleMesh.position.z += 0.1

    this.add(
      weatherMesh,
      this._getBackgroundMesh(),
      titleMesh
    )

    this.position.setX(5.5)
    this.position.setY(0.8)
  }
}

export default NodeTitle