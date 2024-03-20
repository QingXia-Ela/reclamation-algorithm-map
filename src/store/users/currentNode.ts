import core from "@/three";
import Node from "@/three/object/components/node";
import { defineStore } from "pinia";

interface UserCurrentNodeState {
  node: Node | null;
}

// todo!: 将 node 迁移至 store 外部以保证开发工具性能
export const useCurrentNode = defineStore("currentNode", {
  state: () => {
    return {
      node: null,
    } as UserCurrentNodeState;
  },
  actions: {
    setNode(node: Node | null) {
      this.node = node;
    },
    getNode() {
      return this.node
    }
  },
})

setTimeout(() => {
  // 仅用户布局，且当前页面不是编辑页面启用
  // todo!: 优化事件添加
  if (process.env.NODE_ENV === "production" && !location.pathname.includes('/edit/')) {
    const store = useCurrentNode()

    core.addEventListener('nodeclick', (node: Node) => {
      if (store.node) return
      core.setCameraPosition({
        x: node.x + 10,
        y: node.y,
      }, true)
      store.setNode(node)
    })
  }
});