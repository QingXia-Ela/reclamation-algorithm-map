import { defineStore } from "pinia";

interface UserCurrentAnnouncementState {
  show: boolean
}

/**
 * Markdown vue 组件
 * 
 * 放在外部是为了不展示在控制台以保证性能
 */
let currentAnnouncementComponent: any = null

// todo!: 将 node 迁移至 store 外部以保证开发工具性能
export const useCurrentAnnouncement = defineStore("currentAnnouncement", {
  state: () => {
    return {
      show: false
    } as UserCurrentAnnouncementState;
  },
  actions: {
    showDialog() {
      this.show = true
    },
    hideDialog() {
      this.show = false
    },
    toggleDialog(show: boolean) {
      this.show = show
    },
    getCurrentAnnouncementComponent() {
      return currentAnnouncementComponent
    },
    setCurrentAnnouncementComponent(component: any) {
      currentAnnouncementComponent = component
    }
  },
})
