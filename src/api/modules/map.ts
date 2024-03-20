import { SaveMapData } from "@/three/types/data";
import { MapType } from "@/three/types/map";

const getHandleUrl = (type: string) => {
  const nameArr = type.split("_")
  if (nameArr.includes("rift")) {
    return `rift/${type}.json`
  }
  return `map_${type}.json`
}

export async function getMapJson(type: MapType, baseUrl = "") {
  const url = getHandleUrl(type)

  return await (await fetch(`${baseUrl}maps/${url}`)).json() as SaveMapData
}