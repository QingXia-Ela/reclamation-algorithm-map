import { IconType } from "@/assets/icons"

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
  /** 
   * 节点包含的资源，不建议超过3个
   * 
   * @deprecated 
   * - 需要逐步迁移至 `mainResources` 和 `regularResources` 字段
   * - 表单项将会隐藏，优先级会比 `mainResources` 字段低
   */
  resources?: NodeResource[]
  /** 主要资源 */
  mainResources?: Partial<Record<IconType, number>>
  /** 常规资源 */
  regularResources?: Partial<Record<IconType, number>>
  /** 边框尺寸 */
  size: "small" | "large"
  /** 节点边框类型 */
  border: "square" | "hexagon" | "round"
  /** 节点备注 */
  note?: string
}

export type NodePropsWithoutId = Omit<NodeProps, 'nodeId'>
