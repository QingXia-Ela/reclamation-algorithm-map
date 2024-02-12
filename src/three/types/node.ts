// todo!: add rest type
export type NodeType = "resource" | "hunt" | "encounter"

// todo!: add rest type
export type NodeWeather = "normal"

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