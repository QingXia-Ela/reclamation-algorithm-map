/**
 * 用于处理地图点与边数据结构
 */
import Node from '../object/components/node';
import { SaveMapData } from '../types/data';

class DataStrcutHandle {
  nodeMap: Record<number, Node> = {}
  adjancyList: Record<number, number[]> = {}
  constructor() {
    // todo
  }

  init(data: SaveMapData) {
    this.nodeMap = {}
    this.adjancyList = {}
    data.nodes.forEach(node => {
      this.nodeMap[node.nodeId] = new Node(node)
    })
  }
}

export default DataStrcutHandle