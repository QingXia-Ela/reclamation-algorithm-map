import * as THREE from "three";
import { NodePreset, BaseNodeProps, NodeType, NormalNodeProps } from "@/three/types/node";
import Node from "../components/node";
import { NodeDescriptionData } from "@/constants";
import NODE_ASSETS from "@/assets/three/icon/node";
import merge from "lodash/merge";
import NodeCore from "../components/node/components/core";

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

class MarketNode extends Node {
  constructor(options: BaseNodeProps) {
    super(
      merge({
        preset: "market",
        nodeId: -2,
        name: "众人会聚之地",
        x: 5.5,
        y: 15,
        type: "market",
        weather: "normal",
        size: "small",
        border: "round",
        note: NodeDescriptionData["众人会聚之地"],
        mainResources: [],
        regularResources: []
      }, options) as NormalNodeProps
    )

    // @ts-ignore: 强制覆盖 preset，因为 Node 要求的 preset 已经被设定了
    this.options.preset = "market"

    this.position.set(this.x, this.y, this.z);
    this.setPointSelected(false)
  }

  setPointSelected(selected: boolean, color?: number, iconColor?: number): void {
    // 调整为特有颜色
    if (!selected) {
      (this.components.core as NodeCore).changeContentColor(
        0x0c9886,
        0xffffff
      )
    }
    else super.setPointSelected(selected, color, iconColor)
  }
}

export default MarketNode