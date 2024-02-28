import { getDataFromLocal, saveDataToLocal } from '@/utils/three/localStoreMapData'
import MapCore from './core'
import type { SaveMapData } from './types/data'
import { ElMessage } from 'element-plus'

const core = new MapCore()

const data = getDataFromLocal()

async function fetchData() {
  return await fetch("map.json").then(res => res.json()).then(map => {
    core.loadData(map as SaveMapData)
  })
}

if (process.env.NODE_ENV == "production" && data) {
  try {
    core.loadData(data as SaveMapData)
  } catch (e) {
    ElMessage({
      message: "本地地图数据加载失败，将载入远程服务器数据",
      type: "info",
    })
    fetchData().then(() => {
      saveDataToLocal(core)
      ElMessage({
        message: "远程数据加载成功",
        type: "success",
      })
    })
  }
}
else {
  fetchData()
}

export default core