import * as THREE from "three"

function calculateDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
}

function getLineMiddlePoint(x1: number, y1: number, x2: number, y2: number) {
  return {
    x: (x1 + x2) / 2,
    y: (y1 + y2) / 2
  }
}

function getLineRotateAngle(x1: number, y1: number, x2: number, y2: number) {
  return -Math.atan2(y2 - y1, x2 - x1)
}

class Line extends THREE.Group {
  x1: number
  y1: number
  x2: number
  y2: number

  width = .1

  z = .5

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
    const material = new THREE.MeshBasicMaterial({
      color: 0xeeeeee
    });

    const geometry = new THREE.PlaneGeometry(this.width, calculateDistance(this.x1, this.y1, this.x2, this.y2));
    const line = new THREE.Mesh(geometry, material);

    const { x, y } = getLineMiddlePoint(this.x1, this.y1, this.x2, this.y2)
    this.position.set(x, y, this.z)
    this.rotateZ(getLineRotateAngle(this.x1, this.y1, this.x2, this.y2))
    this.add(line);
  }

  setPosition(x1: number, y1: number, x2: number, y2: number) {
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}

export default Line