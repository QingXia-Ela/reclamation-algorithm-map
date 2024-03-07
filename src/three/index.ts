import { getDataFromLocal } from '@/utils/three/localStoreMapData'
import MapCore from './core'
import type { SaveMapData } from './types/data'

const core = new MapCore()

// const data = getDataFromLocal()

fetch("map_main.json").then(res => res.json()).then(map => {
  core.loadData(map as SaveMapData)
})

export default core