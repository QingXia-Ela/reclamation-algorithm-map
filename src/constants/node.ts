import { NodeType, NodeWeather, NodeResource } from "@/three/types/node";

export const NodeTypeArray: Array<NodeType> = [
  "hunt",
  "cave",
  "encounter",
  "battle",
  "collect",
  "expedition",
  "gate",
  "mine",
  "market",
  "nest",
  "outpost",
  "shop",
  "upgrade_battle",
  "upgrade_scout"
]

export const NodeWeatherArray: Array<NodeWeather> = [
  "normal",
  "thunder",
  "thunder_storm",
  "heat",
  "heat_wave",
  "hot",
  "sandstorm",
  "big_sandstorm",
  "acid_rain",
  "drought"
]

export const NodeResourceWeather: Array<NodeResource> = [
  "venison",
  "water",
  "wood"
]