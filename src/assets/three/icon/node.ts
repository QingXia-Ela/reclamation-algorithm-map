/**
 * 此处是节点的类型图标集合
 * 
 * 对应文件夹 `src/assets/three/components/node/node_type/*`
 */
import parseBatchImportToAssets from '@/utils/parseBatchImportToAssets'

const obj = import.meta.glob<any>("../components/node/node_type/*.png", {
  eager: true
})

type ResourcesKeys = "NODE_BATTLE" |
  "NODE_CAVE" |
  "NODE_COLLECT" |
  "NODE_ENCOUNTER" |
  "NODE_EXPEDITION" |
  "NODE_GATE" |
  "NODE_HUNT" |
  "NODE_MARKET" |
  "NODE_MINE" |
  "NODE_NEST" |
  "NODE_OUTPOST" |
  "NODE_SHOP" |
  "NODE_UPGRADE_BATTLE" |
  "NODE_UPGRADE_SCOUT" |
  "NODE_BASE"

const NODE_ASSETS: Record<ResourcesKeys, string> = parseBatchImportToAssets(obj)

// log type
// console.log(Object.keys(NODE_ASSETS).map((k) => `"${k}"`).join(" | \n"));

export default NODE_ASSETS