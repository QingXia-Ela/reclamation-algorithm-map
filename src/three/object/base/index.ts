import * as THREE from "three";
import { NodePreset, NodeType, NormalNodeProps } from "@/three/types/node";
import Node from "../components/node";
import { NodeDescriptionData } from "@/constants";

class BaseNode extends Node {
  constructor() {
    super({
      preset: "normal",
      nodeId: -1,
      name: "驻扎地",
      x: -5,
      y: 8.5,
      type: "gate",
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
    const geometry = new THREE.CircleGeometry(5.5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const circle = new THREE.Mesh(geometry, material);
    this.add(circle);
    this.removeAllObjects()
  }
}

export default BaseNode