import MapCore from './core'
import type { SaveMapData } from './types/data'

const core = new MapCore()

fetch("map.json").then(res => res.json()).then(map => {
  core.loadData(map as SaveMapData)
})

export default core