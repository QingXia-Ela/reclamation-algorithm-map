import MapCore from "@/three/core";
import { NodeType } from "@/three/types/node";

/**
 * Finds all nodes of the specified type
 * @param core MapCore
 * @param type NodeType
 */
export function findNodeByNodeType(core: MapCore, type: NodeType) {
  return Object.values(core.DataHandle.nodeMap).filter((node) => node.options.type === type)
}

/**
 * Finds all nodes with the specified name
 * 
 * @param core MapCore
 * @param name Node name
 * @param includeMode Use `includes` method to search instead of `===` when `true`
 */
export function findNodeByNodeName(core: MapCore, name: string, includeMode = false) {
  return Object.values(core.DataHandle.nodeMap).filter((node) =>
    includeMode ?
      node.options.name.includes(name) :
      node.options.name === name
  )
}

/**
 * Finds all nodes that contain the specified resources.
 * 
 * @param core MapCore
 * @param resources Resources to search.
 * @param needMain Search in mainResources
 * @param needRegular Search in regularResources
 */
export function findNodeByResources(core: MapCore, resources: string[], needMain = true, needRegular = false) {
  return Object.values(core.DataHandle.nodeMap).filter((node) => {
    const mainResources = node.options.mainResources || []
    const regularResources = node.options.regularResources || []
    // 当不需要某类型搜索时直接将其默认为 true 以绕过下面的 some 方法过滤
    let n1 = !needMain, n2 = !needRegular

    if (needMain) {
      n1 = mainResources.some(({ type }) => resources.includes(type))
    }
    if (needRegular) {
      n2 = regularResources.some(({ type }) => resources.includes(type))
    }

    return n1 && n2
  })
}
