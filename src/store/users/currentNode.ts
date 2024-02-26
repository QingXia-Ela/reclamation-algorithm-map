import { defineStore } from "pinia";

export const useCurrentNode = defineStore("currentNode", {
  state: () => {
    return {
      node: null,
    };
  },
  actions: {
    setNode(node: any) {
      this.node = node;
    },
  },
})