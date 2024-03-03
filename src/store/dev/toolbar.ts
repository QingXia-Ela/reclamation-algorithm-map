import { defineStore } from 'pinia'

interface ToolbarState {
  show: boolean
}

export const useToolbar = defineStore('toolbar', {
  state: () => ({
    show: false
  }) as ToolbarState,
  actions: {
    showToolbar() {
      this.show = true
    },
    hideToolbar() {
      this.show = false
    }
  }
})