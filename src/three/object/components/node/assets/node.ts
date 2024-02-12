/**
 * 此处是节点的类型图标集合
 * 
 * 对应文件夹 `src/assets/three/components/node/node_type/*`
 */
import parseBatchImportToAssets from '../utils/parseBatchImportToAssets'

const obj = import.meta.glob<any>("../../../../../assets/three/components/node/node_type/*.png", {
  eager: true
})

// todo!: add rest
// 此处手动设置资源关键字以提供 ts 智能补全
type ResourcesKeys = "NODE_ENCOUNTER" |
  "NODE_COLLECT"

const NODE_ASSETS: Record<ResourcesKeys, string> = parseBatchImportToAssets(obj)

export default NODE_ASSETS