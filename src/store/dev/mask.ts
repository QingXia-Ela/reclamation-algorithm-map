import { defineStore } from 'pinia'

export const useMask = defineStore('mask', {
  state: () => ({
    active: false,
    opacity: 0,
    color: "#000000"
  }),
  actions: {
    show() {
      this.active = true
    },
    hide() {
      this.active = false
    },
    setActive(active: boolean) {
      this.active = active
    },
    setOpacity(opacity: number) {
      this.opacity = opacity
    },
    setColor(color: string) {
      this.color = color
    },
    reset() {
      this.opacity = 0
      this.color = "#000000"
    },
  }
})