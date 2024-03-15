import { defineStore } from 'pinia'

/**
 * 该 Store 用于全局控制一些状态，每个状态都需要有注释进行说明
 * 
 * 假如你不知道有些组件共享状态要放在哪里时可以先往这里放
 */
export const useGlobalState = defineStore('globalState', {
  state: () => ({
    /** 
     * 鼠标是否被占用，当一些功能被激活时（如节点连线），会占用鼠标
     * 
     * 这个时候一些点击事件就需要通过这个变量来判断是否要取消操作 
     */
    MouseOccupy: false,
    /**
     * 是否打开地图选择框
     * 
     * 选择框实现放在 UserToolbar 下，组件没有额外独立出来
     */
    openMapSelect: false
  }),
  actions: {
    setMouseOccupy(state: boolean) {
      this.MouseOccupy = state
    },
    setOpenMapSelect(state: boolean) {
      this.openMapSelect = state
    }
  }
})