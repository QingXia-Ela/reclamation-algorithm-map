import MapCore from "@/three/core";
import { SaveData } from "@/three/types/data";

/**
 * 获取地图数据
 * 
 * 目前仅保存节点数据
 * 
 * @param core 地图核心
 */
export default function getJSONDataFromCore(core: MapCore): SaveData {
  const nodes = Object.values(core.nodeMap).map(node => node.options)
  return {
    nodes
  }
}