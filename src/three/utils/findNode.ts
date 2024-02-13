import * as THREE from 'three'
import Node from '../object/components/node'

export default function findNode(intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) {
  for (const i of intersects) {
    let cur: THREE.Object3D<THREE.Object3DEventMap> | null = i.object

    while (!(cur instanceof Node) && cur.parent) {
      cur = cur.parent
    }

    if (cur) {
      return cur as Node
    }
  }

  return null
}