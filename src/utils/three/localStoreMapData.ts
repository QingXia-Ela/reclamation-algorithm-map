import MapCore from "@/three/core";
import getJSONDataFromCore from "./getJSONDataFromCore";
import devSaveData from "./devSaveData";

const LOCAL_STORAGE_KEY = "reclamation-algorithm-map-node-data";

/**
 * 将地图数据保存到 localStorage
 * 
 * @param core 地图核心实例
 */
export function saveDataToLocal(core: MapCore) {
  if (process.env.NODE_ENV === "development") {
    return devSaveData(core)
  }
  const str = JSON.stringify(getJSONDataFromCore(core), null, 2)
  localStorage.setItem(LOCAL_STORAGE_KEY, str)
}

/**
 * 从 localStorage 获取地图数据
 * 
 * @returns 地图数据
 */
export function getDataFromLocal(): any | null {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (data) {
    return JSON.parse(data)
  }
  return null
}