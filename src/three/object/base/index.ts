import * as THREE from "three";
import { NodePreset, NodeType, NormalNodeProps } from "@/three/types/node";
import Node from "../components/node";
import { NodeDescriptionData } from "@/constants";
import NODE_ASSETS from "@/assets/three/icon/node";

const base_texture = await new THREE.TextureLoader().loadAsync(NODE_ASSETS.NODE_BASE)

function getOuterRound() {
  const OuterRound = new THREE.TorusGeometry(5.5, 0.14, 2, 100)

  const Material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.8
  })
  return new THREE.Mesh(OuterRound, Material)
}

function getInnerCore() {
  const group = new THREE.Group()
  const geometry = new THREE.CircleGeometry(4.5, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const circle = new THREE.Mesh(geometry, material);

  const base_geometry = new THREE.PlaneGeometry(5, 5);
  const base_material = new THREE.MeshBasicMaterial({
    map: base_texture,
    color: 0x000000,
    transparent: true,
  })
  const base = new THREE.Mesh(base_geometry, base_material)

  group.add(circle, base)

  return group
}

class BaseNode extends Node {
  constructor() {
    super({
      preset: "normal",
      nodeId: -1,
      name: "驻扎地",
      x: -5,
      y: 8.5,
      type: "base",
      weather: "normal",
      size: "small",
      border: "round",
      note: NodeDescriptionData["驻扎地"],
      mainResources: [],
      regularResources: []
    })

    // @ts-ignore: 强制覆盖 preset，因为 Node 要求的 preset 已经被设定了
    this.options.preset = "base"

    this.position.set(this.x, this.y, this.z);

    this._baseNode_init();
  }

  updateNode(newOptions: NormalNodeProps): void {
    this.options = newOptions
    this._baseNode_init()
  }

  private _baseNode_init() {
    this.add(getInnerCore(), getOuterRound())
    this.removeAllObjects()
  }
}

export default BaseNode