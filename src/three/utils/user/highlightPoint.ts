import MapCore from "@/three/core";
import Node from "@/three/object/components/node";
import { NodeType } from "@/three/types/node";

let lastTimeCache: any[] | null = null

function cleanCache() {
  if (lastTimeCache) {
    lastTimeCache.forEach((item) => {
      if (item instanceof Node) {
        hlPoint(item, false)
      }
    })
  }
  lastTimeCache = null
}


function hlPoint(node: Node, selected: boolean, color?: number) {
  node.setPointSelected(selected, color)
}

export function highlightPointByType(core: MapCore, type: NodeType, color?: number) {
  if (lastTimeCache) {
    cleanCache()
  }

  const nodes = Object.values(core.DataHandle.nodeMap).filter((node) => node.options.type === type)

  nodes.forEach((item) => {
    hlPoint(item, true, color)
  })
  lastTimeCache = [...nodes]

  return {
    nodes,
    reset: cleanCache
  }
}