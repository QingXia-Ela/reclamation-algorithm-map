import core from '@/three'
import Node from '@/three/object/components/node'
import { NodeProps } from '@/three/types/node'
import { defineStore } from 'pinia'
import { DEFAULT_NODE_CONFIG } from '@/constants/three'
import merge from 'lodash/merge'

interface NodeStateStore {
  node: Node | null
  showSidebar: boolean
  nodeOptions: NodeProps | null
}

export const useCurrentNodeState = defineStore('currentNodeState', {
  state: () => ({
    showSidebar: true,
    node: null,
    nodeOptions: null
  }) as NodeStateStore,
  actions: {
    show() {
      this.showSidebar = true
    },
    hide() {
      this.showSidebar = false
    },
    setVisible(visible: boolean) {
      this.showSidebar = visible
    },
    /**
     * 设置当前节点
     * 
     * @param node 当前选中的节点
     */
    setNode(node: Node) {
      this.node = node
    },
    /**
     * 新增一个节点
     * 
     * @param options 节点配置
     */
    addNode(options: Partial<NodeProps> = {}) {
      const finalOptions = merge({}, DEFAULT_NODE_CONFIG, options)
      this.nodeOptions = finalOptions
      this.node = core.addPoint(finalOptions)
    },
    /**
     * 更新当前节点
     * 
     * 会与默认节点配置与原节点配置进行合并
     * 
     * @param nodeOptions 节点配置
     */
    updateCurrentNode(nodeOptions: Partial<NodeProps> = {}) {
      if (!this.node) return
      const finalOptions = merge({}, this.node.options, nodeOptions)
      this.nodeOptions = finalOptions
      this.node.updateNode(nodeOptions)
    },
    deleteNode(uuid: string) {
      core.removePoint(uuid)
    },
    deleteCurrentNode() {
      if (!this.node) return
      core.removePoint(this.node.uuid)
      this.node = null
    }
  }
})