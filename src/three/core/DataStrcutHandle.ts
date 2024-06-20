/**
 * 用于处理地图点与边数据结构
 */
import BaseNode from '../object/base';
import AnimateLine from '../object/components/animateLine';
import Line from '../object/components/line';
import Node from '../object/components/node';
import MarketNode from '../object/market';
import { SaveMapData } from '../types/data';
import { NodePreset, NodeProps, NodePropsWithoutId, NormalNodeProps } from '../types/node';
import validateMapData from '../utils/validateMapData';

function getNodeIdFromEdgeKey(edgeKey: string) {
  const [id1, id2] = edgeKey.split('-')
  return [Number(id1), Number(id2)]
}

function getEdgeIdeFromNodes(node1: Node, node2: Node) {
  return `${node1.nodeId}-${node2.nodeId}`
}

function getPossibleEdgeIdFromNumbers(nodeId1: number, nodeId2: number) {
  return [
    `${nodeId1}-${nodeId2}`,
    `${nodeId2}-${nodeId1}`
  ]
}

function getPossibleEdgeIdFromNodes(node1: Node, node2: Node) {
  return [
    `${node1.nodeId}-${node2.nodeId}`,
    `${node2.nodeId}-${node1.nodeId}`
  ]
}

function getSpeicalNode(options: NodeProps) {
  switch (options.preset) {
    case "market": // 后舍
      return new MarketNode(options as any)
    // case "camp":
    //   return;
    default:
      return new BaseNode(options as any)
  }
}

class DataStrcutHandle {
  nodeMap: Record<string, Node> = {}
  adjancyList: Record<string, number[]> = {}
  highlightRoute: SaveMapData['highlightRoute'] = []
  highlightRouteRecord: Record<string, AnimateLine> = {}
  /**
   * 边存储
   * 
   * `key` 为 `<node1>-<node2>` 的字符串形式
   */
  edges: Record<string, Line> = {}
  currentMaxNodeId = 0
  constructor() {
    // todo
  }

  /**
   * 从序列化数据加载整张地图
   * 
   * @param data 地图数据
   * @throws 错误信息
   * @returns 旧场景所有的对象
   */
  loadData(data: SaveMapData) {
    const res = validateMapData(data)
    if (res) {
      throw res
    }
    const oldObj = this.removeAllObjs()
    let maxId = 0
    // set unique id
    data.nodes.forEach(node => {
      if (node.nodeId > maxId) maxId = node.nodeId
    })
    // todo!: 这条语句可能导致加载数据前的内存泄露，需要进行分析
    this.edges = {}
    this._setNodesFromData(data.nodes)
    this._setEdgesFromAdjacencyList(data.adjancyList)
    this.highlightRoute = data.highlightRoute

    this.currentMaxNodeId = maxId
    return oldObj
  }

  // todo!: 改造成多个任务，减少CPU占用导致的页面卡顿
  private _setNodesFromData(nodes: NodeProps[]) {
    const len = nodes.length
    for (let i = 0; i < len; i++) {
      this.addNode(nodes[i])
    }
  }

  /**
   * Note: This method must call after the node data loaded.
   */
  // todo!: 改造成多个任务，减少CPU占用导致的页面卡顿
  private _setEdgesFromAdjacencyList(
    adjancyList: Record<number, number[]>
  ) {
    this.adjancyList = {}
    for (const key in adjancyList) {
      const k = Number(key)
      const v = adjancyList[k]

      if (!this.nodeMap[k]) {
        console.warn(`Node ${k} not found.`)
        continue
      }

      for (const dest of v) {
        if (!this.nodeMap[dest]) {
          console.warn(`Node ${dest} not found.`)
          continue
        }

        try {
          // 边重复时抛出错误，但是该图为无向图，所以每条边都必定经历边重复
          // 点不存在已经在上面进行警告和拦截
          this.addEdge(k, dest)
        } catch (e) {

        }
      }
    }
  }

  /**
   * Add a node.
   * 
   * @param options Node options
   * @returns Node
   */
  addNode(options: NodeProps) {
    let node: Node
    if (options.preset !== "normal") {
      node = getSpeicalNode(options)
    }
    else {
      node = options.nodeId ? new Node(options as NormalNodeProps) : new Node({
        ...options as NormalNodeProps,
        nodeId: this.getUniqueNodeId()
      })
    }
    this.nodeMap[node.nodeId] = node
    return node
  }

  /**
   * Remove a node by id.
   * 
   * @param nodeId Node unique id
   * @returns node object or null
   */
  removeNodeById(nodeId: number) {
    const node = this.nodeMap[nodeId]
    if (!node) return null
    delete this.nodeMap[node.nodeId]
    return {
      node,
      edges: this.removeRelativeEdgeByNodeId(nodeId)
    }
  }

  removeNodeByUUID(uuid: string) {
    let node = this.getNodeByUUID(uuid)
    if (node === null) return null
    return this.removeNodeById((node as Node).nodeId)
  }

  removeAllNodes() {
    const oldNodeMap = this.nodeMap
    this.nodeMap = {}
    return oldNodeMap
  }

  /**
   * 通过数字 ID 获取节点
   * 
   * 时间复杂度：`O(1)`
   * 
   * @param nodeId Node 数字 ID
   */
  getNodeByID(nodeId: number) {
    return this.nodeMap[nodeId] || null
  }

  /**
   * 通过 UUID 获取节点
   * 
   * 时间复杂度：`O(n)`
   * 
   * @param uuid Node UUID
   */
  getNodeByUUID(uuid: string) {
    let node: Node | null = null
    Object.values(this.nodeMap).forEach(_node => {
      if (_node.uuid === uuid) node = _node
    })
    // don't know why ts said node is never type
    if (node === null) return null
    return node
  }

  /**
   * @deprecated
   */
  updateNode() { }

  /**
   * 获得唯一节点id
   * 
   * **注意**：这个方法不应该随意调用，会影响到 id 排序
   * 
   * @returns 唯一节点id
   */
  getUniqueNodeId() {
    this.currentMaxNodeId += 1
    return this.currentMaxNodeId
  }

  /**
   * Add an edge.
   * 
   * Note: This method will effect `adjancyList`
   * 
   * @param nid1 First node id
   * @param nid2 Second node id
   * @throws Error 
   */
  addEdge(nid1: number, nid2: number) {
    if (nid1 === nid2) {
      throw new Error(`Node ${nid1} can not be connected to itself.`)
    }
    const [id1, id2] = getPossibleEdgeIdFromNumbers(nid1, nid2)

    if (this.edges[id1] || this.edges[id2]) {
      throw new Error(`Edge ${id1} or ${id2} already exists.`)
    }

    const node1 = this.nodeMap[nid1]
    const node2 = this.nodeMap[nid2]

    if (!node1 || !node2) {
      throw new Error(`Node ${nid1} or ${nid2} not found.`)
    }

    const line = new Line({
      x1: node1.x,
      y1: node1.y,
      x2: node2.x,
      y2: node2.y,
      node1,
      node2
    })

    // 无向图，双向边
    this.edges[id1] = line
    this.edges[id2] = line

    // add to `adjancyList`
    // todo!: optimize this
    if (!this.adjancyList[nid1]) this.adjancyList[nid1] = []
    if (!this.adjancyList[nid2]) this.adjancyList[nid2] = []
    if (!this.adjancyList[nid1].includes(nid2)) this.adjancyList[nid1].push(nid2)
    if (!this.adjancyList[nid2].includes(nid1)) this.adjancyList[nid2].push(nid1)

    return line
  }

  /**
   * 通过两个端点移除边
   * 
   * @param nid1 nodeId1
   * @param nid2 nodeId2
   */
  private _removeAdjancyListEdge(nid1: number, nid2: number) {
    if (this.adjancyList[nid1]) {
      const index = this.adjancyList[nid1].indexOf(nid2)
      if (index !== -1) {
        this.adjancyList[nid1].splice(index, 1)
      }
    }

    if (!this.adjancyList[nid2]) return
    const index2 = this.adjancyList[nid2].indexOf(nid1)
    if (index2 !== -1) {
      this.adjancyList[nid2].splice(index2, 1)
    }
  }

  removeEdgeByUUID(uuid: string) {
    let line: Line | null = null
    for (const key in this.edges) {
      if (this.edges[key].uuid === uuid) {
        line = this.edges[key]
        this._removeAdjancyListEdge(line.node1.nodeId, line.node2.nodeId)
        delete this.edges[key]
        break
      }
    }
    return line
  }

  /**
   * Remove an edge by id.
   * 
   * @param nid1 First node id
   * @param nid2 Second node id
   */
  removeEdgeByNodeId(nid1: number, nid2: number) {
    const [id1, id2] = getPossibleEdgeIdFromNumbers(nid1, nid2)
    this._removeAdjancyListEdge(nid1, nid2)
    // 边 Map 指向同一条边，其中一个有值即可
    const n = this.edges[id1] || this.edges[id2] || null
    delete this.edges[id1]
    delete this.edges[id2]
    return n
  }


  /**
   * Remove relative edge by id.
   * 
   * @param nodeId  Node unique id - `nodeId`
   */
  removeRelativeEdgeByNodeId(nodeId: number) {
    const nodes: number[] = [...(this.adjancyList[nodeId] || [])]
    const edges = []

    // 处理 `adjancyList`
    for (const key in this.adjancyList) {
      const n = Number(key), dest = this.adjancyList[n]
      // 排除自己
      if (n == nodeId) {
        delete this.adjancyList[n]
        continue
      }
      // 反查
      if (dest.includes(nodeId)) {
        nodes.push(n)
        dest.splice(dest.indexOf(nodeId), 1)
        this.adjancyList[n] = dest
      }
    }

    for (const dest of nodes) {
      for (const id of getPossibleEdgeIdFromNumbers(nodeId, dest)) {
        if (this.edges[id]) {
          edges.push(this.edges[id])
          delete this.edges[id]
        }
      }
    }

    return edges
  }

  /**
   * 移除所有的边
   * 
   * @returns 所有的边
   */
  removeAllEdges() {
    const oldEdgeMap = this.edges
    this.edges = {}
    return oldEdgeMap
  }

  getEdge() { }

  updateEdge() { }

  getHighlightRoutes() {
    return this.highlightRoute
  }

  getHighlightRouteObj(id: string) {
    if (this.highlightRouteRecord[id]) {
      return this.highlightRouteRecord[id]
    }
    const res = this.highlightRoute.find((r) => r.id === id)
    if (res) {
      const animateLine = new AnimateLine({
        ...res,
        nodes: res.nodes.map((n) => this.getNodeByID(n))
      })
      this.highlightRouteRecord[id] = animateLine
      return animateLine
    }
  }

  removeHighlightRouteObj(id: string) {
    if (this.highlightRouteRecord[id]) {
      // this.highlightRouteRecord[id].destroy()
      const res = this.highlightRouteRecord[id]
      return res
    }
  }

  removeAllHighlightRoutesObj() {
    const res = this.highlightRouteRecord
    this.highlightRouteRecord = {}
    return res
  }

  /**
   * 移除所有的点与边
   * 
   * @returns 所有的点与边与高亮线路，用于three场景移除
   */
  removeAllObjs() {
    return {
      nodes: this.removeAllNodes(),
      edges: this.removeAllEdges(),
      highlightRoutes: this.removeAllHighlightRoutesObj()
    }
  }
}

export default DataStrcutHandle