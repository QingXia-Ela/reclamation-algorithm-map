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
  "upgrade_scout" |
  "base" |
  // 未知节点类型，用于不固定的节点
  "unknown"


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

/**
 * 不会展示在地图上的资源
 */
export type NodeResourceWithoutShow = "gold" | "goodsundry"

/**
 * `base` - 基地节点，全局只有一个
 * 
 * `camp` - 前进营地
 * 
 * `backroom` - 后室
 * 
 * `normal` - 普通节点
 */
export type NodePreset = "base" | "camp" | "backroom" | "normal"

type ResourceType = Array<{
  type: NodeResource,
  count: number
}>

export interface NormalNodeProps {
  /**
   * 特殊节点预设，该项为 `normal` 时则使用默认节点
   */
  preset: "normal"
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
  mainResources?: ResourceType
  /** 常规资源 */
  regularResources?: ResourceType
  /** 边框尺寸 */
  size: "small" | "large"
  /** 节点边框类型 */
  border: "square" | "hexagon" | "round"
  /** 节点备注 */
  note?: string
}

export interface BaseNodeProps {
  nodeId: number
  preset: "base",
  name?: string
  x: number
  y: number
}

export interface MarketNodeProps {
  nodeId: number
  preset: "market",
  name?: string
  x: number
  y: number
}

export type NodeProps = NormalNodeProps | BaseNodeProps | MarketNodeProps

export type NodePropsWithoutId = Omit<NodeProps, 'nodeId'>
