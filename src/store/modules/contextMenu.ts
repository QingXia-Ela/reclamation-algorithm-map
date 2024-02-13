import core from '@/three'
import { defineStore } from 'pinia'

export const useContextMenu = defineStore('contextMenu', {
  state: () => ({
    visible: false,
    domPos: {
      x: 0,
      y: 0
    },
    mapPos: {
      x: 0,
      y: 0
    }
  }),
  actions: {
    /**
     * **注意**: 这是一个仅用于地图的方法，不应该在 vue 组件内被调用
     */
    setDomPos(x: number, y: number) {
      this.domPos = {
        x,
        y
      }
    },
    /**
     * **注意**: 这是一个仅用于地图的方法，不应该在 vue 组件内被调用
     */
    setMapPos(x: number, y: number) {
      this.mapPos = {
        x,
        y
      }
    },
    show() {
      this.visible = true
    },
    hide() {
      this.visible = false
    }
  }
})

// 延迟执行，控制 pinia 在 app 创建后才执行
new Promise<void>((resolve) => resolve()).then(() => {
  const store = useContextMenu()

  core.addEventListener('contextmenu', (event, intersects) => {
    if (intersects.length) {
      const { point } = intersects[0]

      store.setDomPos(event.clientX, event.clientY)
      store.setMapPos(point.x, point.y)
      store.show()
    }
  })
})