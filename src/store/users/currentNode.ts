import core from "@/three";
import Node from "@/three/object/components/node";
import { defineStore } from "pinia";

interface UserCurrentNodeState {
  node: Node | null;
}

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
  },
})

setTimeout(() => {
  // 仅用户布局启用
  if (process.env.NODE_ENV === "production") {
    const store = useCurrentNode()
    core.addEventListener('nodeclick', (node: Node) => {
      if (store.node) return
      core.setCameraPosition({
        x: node.x + 10,
        y: node.y
      }, true)
      store.setNode(node)
    })
  }
});