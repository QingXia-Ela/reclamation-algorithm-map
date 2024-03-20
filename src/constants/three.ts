import { NormalNodeProps } from "@/three/types/node";

export const DEFAULT_NODE_CONFIG: Omit<NormalNodeProps, 'nodeId'> = {
  preset: "normal",
  x: 0,
  y: 0,
  name: "Node",
  type: "unknown",
  weather: "normal",
  resources: [],
  size: "small",
  border: "square",
  note: "",
  mainResources: [],
  regularResources: [],
}