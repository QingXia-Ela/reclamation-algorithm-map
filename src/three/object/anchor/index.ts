import * as THREE from 'three'

class MapAnchor extends THREE.Group {
  constructor() {
    super()

    this._init()
  }

  private _init() {
    // 创建十字形锚点材质
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    // 创建十字形锚点几何体
    const anchorGeometry = new THREE.CircleGeometry(0.2, 8);

    const mesh = new THREE.Mesh(anchorGeometry, material);

    // 将线条添加到场景中
    this.add(mesh);
  }
}

export default MapAnchor