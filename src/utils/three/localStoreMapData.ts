import MapCore from "@/three/core";
import getJSONDataFromCore from "./getJSONDataFromCore";
import { clientSaveMap } from "@/plugins/vite/vite-plugin-save-map/client";
import { ElMessage } from "element-plus";

const LOCAL_STORAGE_KEY = "reclamation-algorithm-map-node-data";

/**
 * 将地图数据保存到 localStorage
 * 
 * @param core 地图核心实例
 */
export function saveDataToLocal(core: MapCore) {
  const str = JSON.stringify(getJSONDataFromCore(core), null, 2)
  if (process.env.NODE_ENV === "development") {
    ElMessage.success(`Vite 开发环境，数据已保存到项目本地`)
    clientSaveMap(str)
  }
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