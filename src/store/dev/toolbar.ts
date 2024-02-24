import { defineStore } from 'pinia'

export const useToolbar = defineStore('toolbar', {
  state: () => ({
    show: false
  }),
  actions: {
    show() {
      this.show = true
    },
    hide() {
      this.show = false
    }
  }
})