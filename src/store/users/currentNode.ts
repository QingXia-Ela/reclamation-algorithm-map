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
  // const store = useCurrentNode()

  // core.addEventListener('nodeclick', (node: Node) => {
  //   console.log('user', node);

  //   if (store.node) return
  //   store.setNode(node)
  // })
});