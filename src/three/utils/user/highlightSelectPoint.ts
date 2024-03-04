import Line from "@/three/object/components/line"
import Node from "@/three/object/components/node"
import findShortestRoad from "../algorithm/findShortestRoad"
import MapCore from "@/three/core"

let lastTimeCache: any[] | null = null

function controlNode(node: Node, hl = false) {
  node.setPointSelected(hl)
}

function controlLine(line: Line, hl = false) {
  if (hl) {
    line.setLineColor(0xff0000)
  } else {
    line.setLineColor(0xffffff)
  }
}

function cleanCache() {
  if (lastTimeCache) {
    lastTimeCache.forEach((item) => {
      if (item instanceof Node) {
        controlNode(item, false)
      } else if (item instanceof Line) {
        controlLine(item, false)
      }
    })
  }
}

function highlightSelectPoint(core: MapCore, start: number, end: number) {
  const reset = () => {
    cleanCache()
  }

  const { nodes, edges } = findShortestRoad(core, start, end)

  nodes.forEach((item) => {
    if (item instanceof Node) {
      controlNode(item, true)
    }
  })
  edges.forEach((item) => {
    if (item instanceof Line) {
      controlLine(item, true)
    }
  })
  lastTimeCache = [...nodes, ...edges]

  return {
    nodes,
    edges,
    reset
  }
}

export default highlightSelectPoint