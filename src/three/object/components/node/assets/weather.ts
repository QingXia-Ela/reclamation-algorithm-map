/**
 * 此处是节点的天气类型图标集合
 * 
 * 对应文件夹 `src/assets/three/components/node/weather_icon/*`
 */

import { NodeWeather } from '@/three/types/node'
import parseBatchImportToAssets from '../utils/parseBatchImportToAssets'

const obj = import.meta.glob<any>("../../../../../assets/three/components/node/weather_icon/*.png", {
  eager: true
})

// todo!: add rest
type ResourcesKeys = "WEATHER_ACID_RAIN" |
  "WEATHER_BIG_SANDSTORM" |
  "WEATHER_DROUGHT" |
  "WEATHER_HEAT" |
  "WEATHER_HEAT_WAVE" |
  "WEATHER_HOT" |
  "WEATHER_NORMAL" |
  "WEATHER_SANDSTORM" |
  "WEATHER_THUNDER" |
  "WEATHER_THUNDER_STORM"

const data: Record<ResourcesKeys, string> = parseBatchImportToAssets(obj)

const WEATHER_ASSETS: Record<NodeWeather, string> = {
  normal: data.WEATHER_NORMAL,
}

export default WEATHER_ASSETS