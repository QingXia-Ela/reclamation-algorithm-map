/**
 * 此处对应节点所包含的资源静态文件，如水源，鹿肉等
 * 
 * 对应文件夹 `src/assets/three/components/node/resources_icon/*`
 */

import { NodeResource } from '@/three/types/node'
import parseBatchImportToAssets from '../utils/parseBatchImportToAssets'

const obj = import.meta.glob<any>("../../../../../assets/three/components/node/resources_icon/*.png", {
  eager: true
})

type ResourcesKeys = "SANDBOX_1_BEEF" |
  "SANDBOX_1_CONDIMENT" |
  "SANDBOX_1_CRAB" |
  "SANDBOX_1_DIAMOND" |
  "SANDBOX_1_DIMENSIONCOIN" |
  "SANDBOX_1_EGG" |
  "SANDBOX_1_GOLD" |
  "SANDBOX_1_HORN" |
  "SANDBOX_1_IRON" |
  "SANDBOX_1_MUSHROOM" |
  "SANDBOX_1_PEPER" |
  "SANDBOX_1_POULTRY" |
  "SANDBOX_1_STONE" |
  "SANDBOX_1_SUGAR" |
  "SANDBOX_1_SUPERMEAT" |
  "SANDBOX_1_TECH_ICON_ANIMALSPEED" |
  "SANDBOX_1_TECH_ICON_ATKSPEED" |
  "SANDBOX_1_TECH_ICON_BATTLEBUFF" |
  "SANDBOX_1_TECH_ICON_BATTLEDEF" |
  "SANDBOX_1_TECH_ICON_BATTLERED" |
  "SANDBOX_1_TECH_ICON_COINSLOT" |
  "SANDBOX_1_TECH_ICON_DEF" |
  "SANDBOX_1_TECH_ICON_ENEMYATKSPEED" |
  "SANDBOX_1_TECH_ICON_ENEMYSPEED" |
  "SANDBOX_1_TECH_ICON_FIX" |
  "SANDBOX_1_TECH_ICON_HOT" |
  "SANDBOX_1_TECH_ICON_HP" |
  "SANDBOX_1_TECH_ICON_IRONATK" |
  "SANDBOX_1_TECH_ICON_PRODUCE" |
  "SANDBOX_1_TECH_ICON_RAIN" |
  "SANDBOX_1_TECH_ICON_RIFT2" |
  "SANDBOX_1_TECH_ICON_RIFT3" |
  "SANDBOX_1_TECH_ICON_RIFT4" |
  "SANDBOX_1_TECH_ICON_RIFT5" |
  "SANDBOX_1_TECH_ICON_RIFT6" |
  "SANDBOX_1_TECH_ICON_SHIELD" |
  "SANDBOX_1_TECH_ICON_SHOP" |
  "SANDBOX_1_TECH_ICON_SHOPDISCOUNT" |
  "SANDBOX_1_TECH_ICON_SHOPGOODS" |
  "SANDBOX_1_TECH_ICON_SHOPSLOT" |
  "SANDBOX_1_TECH_ICON_SPEED" |
  "SANDBOX_1_TECH_ICON_STONEATK" |
  "SANDBOX_1_TECH_ICON_VIEWAREA" |
  "SANDBOX_1_TECH_ICON_VIEWSOURCE" |
  "SANDBOX_1_TECH_ICON_VIEWTIME" |
  "SANDBOX_1_TECH_ICON_WATER" |
  "SANDBOX_1_TECH_ICON_WIND" |
  "SANDBOX_1_TECH_ICON_WOODATK" |
  "SANDBOX_1_TTLMEAT" |
  "SANDBOX_1_VENISON" |
  "SANDBOX_1_WATER" |
  "SANDBOX_1_WHEAT" |
  "SANDBOX_1_WOOD"

const data: Record<ResourcesKeys, string> = parseBatchImportToAssets(obj)

const RESOURCE_ASSETS: Record<NodeResource, string> = {
  wood: data.SANDBOX_1_WOOD,
  water: data.SANDBOX_1_WATER,
  venison: data.SANDBOX_1_VENISON,
}

// log type
// console.log(Object.keys(RESOURCE_ASSETS).map((k) => `"${k}"`).join(" | \n"));

// todo!: add rest
export default RESOURCE_ASSETS