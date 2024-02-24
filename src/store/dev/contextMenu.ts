import core from '@/three'
import { defineStore } from 'pinia'
import { useGlobalState } from './globalState'

export const useContextMenu = defineStore('contextMenu', {
  state: () => ({
    visible: false,
    disabled: false,
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
      if (this.disabled) return
      this.visible = true
    },
    hide() {
      this.visible = false
    },
    setVisible(visible: boolean) {
      this.visible = visible
    }
  }
})

// 延迟执行，控制 pinia 在 app 创建后才执行
setTimeout(() => {
  const store = useContextMenu()
  const state = useGlobalState()

  core.addEventListener('contextmenu', (event, intersects) => {
    if (state.MouseOccupy) return
    event.preventDefault()

    if (intersects.length) {
      const { point } = intersects[0]

      store.setDomPos(event.clientX, event.clientY)
      store.setMapPos(point.x, point.y)
      store.show()
    }
  })
});