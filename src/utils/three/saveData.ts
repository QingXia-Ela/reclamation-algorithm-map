import MapCore from "@/three/core"
import getJSONDataFromCore from "./getJSONDataFromCore"
import { seralizeCurrentTime } from "../time"
import saveTextFile from "../file/saveTextFile"
import { clientSaveMap } from "@/plugins/vite/vite-plugin-save-map/client"
import { ElMessage } from "element-plus"

export default function saveData(core: MapCore) {
  const data = getJSONDataFromCore(core)
  const str = JSON.stringify(data, null, 2)
  if (process.env.NODE_ENV === "development") {
    ElMessage.success(`Vite 开发环境，数据已保存到项目本地`)
    clientSaveMap(str)
    return
  }
  saveTextFile(str, `生息演算地图数据 ${seralizeCurrentTime()}.json`)
}