import * as THREE from 'three'
import type { NodeResource as NodeResourceType } from '@/three/types/node'
import * as RESOURCE_ASSETS from '../assets/resource'

interface NodeResourceProps {
  resources: NodeResourceType[]
}

const SQRT_3 = Math.sqrt(3)

/**
 * Create a diamond shape
 * 
 * @param mode `1` - Create top shape; `2` - Create right bottom shape; `3` - Create left bottom shape
 */
function createDiamond(mode = 1) {
  var diamondShape = new THREE.Shape();

  let color = 0x343434

  switch (mode) {
    case 2:
      diamondShape.lineTo(SQRT_3, 1);
      diamondShape.lineTo(SQRT_3, -1);
      diamondShape.lineTo(0, -2);
      diamondShape.lineTo(0, 0);
      color = 0x525252
      break;

    case 3:
      diamondShape.lineTo(-SQRT_3, 1);
      diamondShape.lineTo(-SQRT_3, -1);
      diamondShape.lineTo(0, -2);
      diamondShape.lineTo(0, 0);
      color = 0x242424
      break;

    default:
      diamondShape.lineTo(SQRT_3, 1);
      diamondShape.lineTo(0, 2);
      diamondShape.lineTo(-SQRT_3, 1);
      diamondShape.lineTo(0, 0);
      break;
  }


  const geometry = new THREE.ShapeGeometry(diamondShape)

  return new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({
      color
    })
  )
}

function createBackgroundMesh() {
  const group = new THREE.Group()
  const OuterDiamond = new THREE.Mesh(
    new THREE.TorusGeometry(2.15, 0.14, 2, 6),
    new THREE.MeshBasicMaterial({
      color: 0xefefef,
      transparent: true,
      opacity: 0.5
    })
  )
  OuterDiamond.rotateZ(Math.PI / 6)

  for (let i = 1; i <= 3; i++) {
    group.add(createDiamond(i))
  }

  group.add(OuterDiamond)

  return group
}

// 全局共用几何体背景，节省内存
const GlobalIconBackgroundMesh = createBackgroundMesh()
const textureLoader = new THREE.TextureLoader()

class NodeResource extends THREE.Group {

  constructor(options: NodeResourceProps) {
    super()

    this._init(options)
  }

  private _getIconBackgroundMesh() {
    // group 包裹，使得其可以控制位置
    const groupWrapper = new THREE.Group()
    return groupWrapper.add(GlobalIconBackgroundMesh)
  }

  private async _getResourceTexture(type: NodeResourceType) {
    // @ts-ignore: weather will keep same by resource name
    const url = RESOURCE_ASSETS[`RESOURCE_${type.toUpperCase()}`]
    const texture = await textureLoader.loadAsync(url)
    return texture
  }

  private _getResourceIconMesh(texture: THREE.Texture) {
    const group = new THREE.Group()

    const width = 1.4
    const height = width * texture.image.height / texture.image.width

    const icon = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color: 0xcccccc
      })
    )

    icon.position.z += 0.001

    group.add(icon, this._getIconBackgroundMesh())

    return group
  }

  private async _getResourceIconGroup(resources: NodeResourceProps['resources']) {
    const group = new THREE.Group()

    for (const i of resources) {
      group.add(this._getResourceIconMesh(
        await this._getResourceTexture(i)
      ))
    }

    return group
  }

  private async _init(options: NodeResourceProps) {
    const g = await this._getResourceIconGroup(options.resources)
    g.scale.set(0.4, 0.4, 1)
    this.add(g)
  }
}

export default NodeResource