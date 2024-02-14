import { NodeProps } from "@/three/types/node";

export const DEFAULT_NODE_CONFIG: NodeProps = {
  x: 0,
  y: 0,
  name: "Node",
  type: "collect",
  weather: "normal",
  resources: [],
  size: "small",
  border: "square"
}