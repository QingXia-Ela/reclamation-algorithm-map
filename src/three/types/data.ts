import { NodeProps } from "./node";
import { BackgroundType, MapType } from './map'

export interface HighlightRouteProps {
  id: string
  name: string
  nodes: number[]
  lineColor: number
  bgColor: number
}

/**
 * 地图数据
 * 
 * @interface SaveMapData
 */
export interface SaveMapData {
  /**
   * 地图类型
   */
  metadata: {
    name?: string
    type: MapType,
    backgroundSize: number
    backgroundType: BackgroundType
  }
  /**
   * 节点数据
   */
  nodes: NodeProps[]
  /**
   * 节点邻接表，用于建立边
   */
  adjancyList: Record<string, number[]>
  /**
   * 高亮路径
   */
  highlightRoute: HighlightRouteProps[]
}
