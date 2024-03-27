import { CampNodeProps, NormalNodeProps } from "@/three/types/node";
import merge from "lodash/merge";
import Node from "../components/node";
import { SpeicalNodeType } from "../constants";
import { NodeDescriptionData } from "@/constants";
import NodeTitle from "../components/node/components/title";

function getNodeTitleObj(options: ConstructorParameters<typeof NodeTitle>[0]) {
  const obj = new NodeTitle(options)

  obj.position.x += 3
  obj.position.y -= 1

  return obj
}

class CampNode extends Node {
  constructor(options: CampNodeProps) {
    super(
      merge({
        preset: "normal",
        nodeId: SpeicalNodeType.MARKET_NODE,
        name: "前进营地",
        x: 0,
        y: 0,
        type: "camp",
        weather: "normal",
        size: "large",
        border: "round",
        note: NodeDescriptionData["前进营地"],
        mainResources: [],
        regularResources: []
      } as NormalNodeProps, options)
    )

    // @ts-ignore: 强制覆盖 preset，因为 Node 要求的 preset 已经被设定了
    this.options.preset = "camp"

    this.position.set(this.x, this.y, this.z);
  }

  updateNode(newOptions: NormalNodeProps) {
    this.options = newOptions
    this._campNode_init()
  }

  _campNode_init() {
    this.removeAllObjects()
  }
}

export default CampNode