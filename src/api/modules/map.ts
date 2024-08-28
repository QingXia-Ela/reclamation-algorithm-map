import { SaveMapData } from "@/three/types/data";
import { MapType } from "@/three/types/map";
import fetchLocal from "@/utils/fetchLocal";

const getHandleUrl = (type: string) => {
  const nameArr = type.split("-")
  if (nameArr.includes("百变陌域模板")) {
    return `rift/${type}.json`
  }
  return `map_${type}.json`
}

export async function getMapJson(type: MapType, baseUrl = "") {
  const url = getHandleUrl(type)

  return await (await fetchLocal(`${baseUrl}maps/${url}`)).json() as SaveMapData
}