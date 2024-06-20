import MapCore from "@/three/core";
import { SaveMapData } from "@/three/types/data";

/**
 * 获取地图数据
 * 
 * 目前仅保存节点数据
 * 
 * @param core 地图核心
 */
export default function getJSONDataFromCore(core: MapCore): SaveMapData {
  const nodes = Object.values(core.DataHandle.nodeMap)
    .map(node => node.options)

  return {
    metadata: core.getMetadata(),
    nodes,
    adjancyList: core.DataHandle.adjancyList,
    highlightRoute: core.DataHandle.highlightRoute
  }
}