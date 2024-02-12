import * as THREE from 'three'

/**
 * 创建一个圆角矩形
 * 
 * @param width Box width
 * @param height Box height
 * @param depth Box depth
 * @param radius0 Box radius
 * @returns 
 */
export default function createBoxWithRoundedEdges(
  width: number,
  height: number,
  depth: number,
  radius0: number
) {
  let shape = new THREE.Shape();
  let eps = 0.00001;
  let radius = radius0 - eps;
  shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
  shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
  shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
  shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
  let geometry = new THREE.ExtrudeGeometry(shape, {
    depth: depth - radius0 * 2,
    steps: 1,
    bevelSize: radius,
    bevelThickness: radius0
  });
  geometry.center();
  return geometry;
}