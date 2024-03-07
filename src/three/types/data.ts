import { NodeProps } from "./node";
import { MapType } from './map'

/**
 * 地图数据
 * 
 * @interface SaveMapData
 */
export interface SaveMapData {
  /**
   * 地图类型
   */
  type: MapType
  /**
   * 节点数据
   */
  nodes: NodeProps[]
  /**
   * 节点邻接表，用于建立边
   */
  adjancyList: Record<string, number[]>
}
