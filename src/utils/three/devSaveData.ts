import { clientSaveMap } from "@/plugins/vite/vite-plugin-save-map/client"
import { ElMessage } from "element-plus"
import getJSONDataFromCore from "./getJSONDataFromCore"
import MapCore from "@/three/core"
import debounce from "lodash/debounce"

function saveDataCore(core: MapCore) {
  const data = getJSONDataFromCore(core)
  const str = JSON.stringify(data, null, 2)
  if (process.env.NODE_ENV === "development") {
    ElMessage.success(`数据已保存到本地`)
    clientSaveMap(str)
    return
  }
}


const saveDataDebounce = debounce(function (core: MapCore) {
  saveDataCore(core)
}, 3000)

/**
 * 开发环境下存储数据方法
 * 
 * @param core 地图核心
 * @param immidiate 立即存储数据，取消节流
 */
function devSaveData(core: MapCore, immidiate = false) {
  if (immidiate) {
    saveDataCore(core)
    return
  }
  saveDataDebounce(core)
}

export default devSaveData