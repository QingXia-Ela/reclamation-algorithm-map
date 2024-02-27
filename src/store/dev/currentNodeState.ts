import core from '@/three'
import Node from '@/three/object/components/node'
import { NodeProps } from '@/three/types/node'
import { defineStore } from 'pinia'
import { DEFAULT_NODE_CONFIG } from '@/constants/three'
import merge from 'lodash/merge'
import { useGlobalState } from './globalState'
import { useCurrentNode } from '../users/currentNode'

interface NodeStateStore {
  node: Node | null
  showSidebar: boolean
  nodeOptions: NodeProps | null
}

export const useCurrentNodeState = defineStore('currentNodeState', {
  state: () => ({
    showSidebar: false,
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
      if (!node) return
      if (this.showSidebar) return
      this.node = node
      this.nodeOptions = node.options
    },
    /**
     * 新增一个节点
     * 
     * @param options 节点配置
     */
    addNode(options: Partial<NodeProps> = {}) {
      const finalOptions = merge({}, DEFAULT_NODE_CONFIG, options) as NodeProps
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
    /**
     * 从地图删除当前 store 内的节点
     * 
     * 该操作会同时置空 store 内的数据
     * 
     * **注意**: 该操作不会隐藏侧边栏，需要手动关闭
     * 
     * @returns 删除成功标志
     */
    deleteCurrentNode() {
      if (!this.node) return
      const res = core.removePoint(this.node.uuid)
      if (res) {
        this.node = null
        this.nodeOptions = null
      }
      return res
    }
  }
})

/**
 * 未来更新功能如下：
 * 
 * 点击某个节点时首先展示简略信息，简略信息框包括编辑、移动和删除按钮
 */
setTimeout(() => {
  const store = useCurrentNodeState()
  const state = useGlobalState()
  const currentNode = useCurrentNode()
  // 当某个节点被点击时弹出编辑菜单
  // 注意：这只是临时方法，并不会长期使用
  core.addEventListener('nodeclick', (node: Node) => {
    if (state.MouseOccupy || store.showSidebar || currentNode.node) return
    core.setCameraPosition({
      x: node.x + 10,
      y: node.y
    }, true)
    store.setNode(node)
    store.show()
  })
});
