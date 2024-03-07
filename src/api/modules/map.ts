import { SaveMapData } from "@/three/types/data";
import { MapType } from "@/three/types/map";

export async function getMapJson(type: MapType) {
  return await (await fetch(`map_${type}.json`)).json() as SaveMapData
}