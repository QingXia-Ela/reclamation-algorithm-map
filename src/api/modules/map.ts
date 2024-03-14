import { SaveMapData } from "@/three/types/data";
import { MapType } from "@/three/types/map";

export async function getMapJson(type: MapType, baseUrl = "") {
  return await (await fetch(`${baseUrl}maps/map_${type}.json`)).json() as SaveMapData
}