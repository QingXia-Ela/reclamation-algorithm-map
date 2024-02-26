import { getDataFromLocal } from '@/utils/three/localStoreMapData'
import MapCore from './core'
import type { SaveMapData } from './types/data'

const core = new MapCore()

const data = getDataFromLocal()

if (process.env.NODE_ENV == "production" && data) {
  core.loadData(data as SaveMapData)
}
else {
  fetch("map.json").then(res => res.json()).then(map => {
    core.loadData(map as SaveMapData)
  })
}

export default core