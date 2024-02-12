export type NodeType = "resource" | "hunt" | "encounter"

export type NodeWeather = "normal"

export type NodeResource = "water" | "wood" | "meat"

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