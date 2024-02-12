// todo!: add rest type
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


// todo!: add rest type
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
export type NodeResource = "water" | "wood" | "venison"

export interface NodeProps {
  x: number
  y: number
  name: string
  type: NodeType
  weather: NodeWeather
  resources: NodeResource[]
  size: "small" | "large"
  border: "square" | "hexagon" | "round"
}