import * as THREE from 'three'
import type { NodeResource as NodeResourceType } from '@/three/types/node'
import RESOURCE_ASSETS from '../../../../../assets/three/icon/resource'

interface NodeResourceProps {
  resources: NodeResourceType[]
}

const SQRT_3 = Math.sqrt(3)

// todo!: add rest
function getResourceColorByType(type: NodeResourceType) {
  switch (type) {
    case "water":
      return 0x2a94a7
  }

  return 0xcccccc
}

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

const textureLoader = new THREE.TextureLoader()

class NodeResource extends THREE.Group {

  constructor(options: NodeResourceProps) {
    super()

    this._init(options)
  }

  private _getIconBackgroundMesh() {
    return createBackgroundMesh()
  }

  private async _getResourceTexture(type: NodeResourceType) {
    // @ts-ignore: weather will keep same by resource name
    const url = RESOURCE_ASSETS[type]
    const texture = await textureLoader.loadAsync(url)
    return texture
  }

  private async _getResourceIconMesh(type: NodeResourceType, pos = 0, color = 0xcccccc) {
    const texture = await this._getResourceTexture(type)

    const group = new THREE.Group()

    const width = 1.5
    const height = width * texture.image.height / texture.image.width

    const icon = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
        color,
      })
    )
    // todo!: 增加根据类型的位置微调函数，部分资源材质在展示时位置不精准，需要函数处理
    icon.position.z += 0.001

    group.add(icon, this._getIconBackgroundMesh())

    group.position.x += pos * 2.5 * SQRT_3

    return group
  }

  private async _getResourceIconGroup(resources: NodeResourceProps['resources']) {
    const group = new THREE.Group()

    for (const [i, index] of resources.map((i, index) => [i, index]) as [NodeResourceType, number][]) {
      group.add(await this._getResourceIconMesh(
        i, index, getResourceColorByType(i)
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