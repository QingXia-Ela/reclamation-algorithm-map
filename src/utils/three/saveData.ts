import MapCore from "@/three/core"
import getJSONDataFromCore from "./getJSONDataFromCore"
import { seralizeCurrentTime } from "../time"
import saveTextFile from "../file/saveTextFile"
import devSaveData from "./devSaveData"

export default function saveData(core: MapCore) {
  if (process.env.NODE_ENV === "development") {
    return devSaveData(core)
  }
  const data = getJSONDataFromCore(core)
  const str = JSON.stringify(data, null, 2)
  saveTextFile(str, `生息演算地图数据 ${seralizeCurrentTime()}.json`)
}