import * as THREE from "three"

class Line extends THREE.Line {
  x1: number
  y1: number
  x2: number
  y2: number
  constructor({
    x1,
    y1,
    x2,
    y2
  }: {
    x1: number,
    y1: number,
    x2: number,
    y2: number
  }) {
    super()

    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2

    this._init()
  }

  private _init() {
    const material = new THREE.LineBasicMaterial({
      linewidth: 100,
    });

    const points = [];
    points.push(new THREE.Vector3(this.x1, this.y1, 0));
    points.push(new THREE.Vector3(this.x2, this.y2, 0));
    // points.push(new THREE.Vector3(10, 0, 0));

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    this.geometry = geometry
    this.material = material
  }

  setPosition(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}

export default Line