import * as THREE from 'three'
import Line from '../object/components/line'

export default function findLine(intersects: THREE.Intersection<THREE.Object3D<THREE.Object3DEventMap>>[]) {
  for (const i of intersects) {
    let cur: THREE.Object3D<THREE.Object3DEventMap> | null = i.object

    while (!(cur instanceof Line) && cur.parent) {
      cur = cur.parent
    }

    if (cur) {
      return cur
    }
  }

  return null
}