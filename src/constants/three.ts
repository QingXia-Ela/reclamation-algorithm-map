import { NodePropsWithoutId } from "@/three/types/node";

export const DEFAULT_NODE_CONFIG: NodePropsWithoutId = {
  x: 0,
  y: 0,
  name: "Node",
  type: "collect",
  weather: "normal",
  resources: [],
  size: "small",
  border: "square",
  note: "",
  mainResources: [],
  regularResources: [],
}