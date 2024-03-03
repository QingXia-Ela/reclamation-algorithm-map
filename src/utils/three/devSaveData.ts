import { clientSaveMap } from "@/plugins/vite/vite-plugin-save-map/client"
import { ElMessage } from "element-plus"
import getJSONDataFromCore from "./getJSONDataFromCore"
import MapCore from "@/three/core"
import debounce from "lodash/debounce"

const devSaveData = debounce(function (core: MapCore) {
  const data = getJSONDataFromCore(core)
  const str = JSON.stringify(data, null, 2)
  if (process.env.NODE_ENV === "development") {
    ElMessage.success(`数据已保存到本地`)
    clientSaveMap(str)
    return
  }
}, 4000)

export default devSaveData