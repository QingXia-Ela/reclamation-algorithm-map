export type NodeType = "hunt" |
  "cave" |
  "encounter" |
  "battle" |
  "collect" |
  "expedition" |
  "gate" |
  "mine" |
  "market" |
  "nest" |
  "outpost" |
  "shop" |
  "upgrade_battle" |
  "upgrade_scout"


export type NodeWeather = "normal" |
  "thunder" |
  "thunder_storm" |
  "heat" |
  "heat_wave" |
  "hot" |
  "sandstorm" |
  "big_sandstorm" |
  "acid_rain" |
  "drought"

// todo!: add rest type
export type NodeResource = "water" | "wood" | "stone" | "iron" | "diamond" | "venison" | "poultry" | "crab" | "beef"

export interface NodeProps {
  /**
   * 节点 id，用于建图
   */
  nodeId: number
  /** x 坐标 */
  x: number
  /** y 坐标 */
  y: number
  /** 节点名称 */
  name: string
  /** 节点类型 */
  type: NodeType
  /** 节点天气 */
  weather: NodeWeather
  /** 节点包含的资源，不建议超过3个 */
  resources: NodeResource[]
  /** 边框尺寸 */
  size: "small" | "large"
  /** 节点边框类型 */
  border: "square" | "hexagon" | "round"
  /** 节点备注 */
  note?: string
  /**
   * 地图资源 id
   */
  mapAssetsId?: string
}

export type NodePropsWithoutId = Omit<NodeProps, 'nodeId'>
