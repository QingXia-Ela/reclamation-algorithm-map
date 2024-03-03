import core from '@/three'
import Line, { LineProps } from '@/three/object/components/line'
import { defineStore } from 'pinia'

interface CurrentLineState {
  currentLine: LineProps | null
}

// 状态放到外部防止开发工具崩溃
let outerLine: Line | null = null

export const useCurrentLineState = defineStore('currentLineState', {
  state: () => {
    return {
      currentLine: null
    } as CurrentLineState
  },
  actions: {
    getCurrentLine() {
      return outerLine
    },
    setCurrentLine(line: Line) {
      outerLine = line
      this.currentLine = line.getProps()
    },
    deleteCurrentLine() {
      if (!outerLine) return
      core.removeEdgeByNodeIds(outerLine.node1.id, outerLine.node2.id)
      outerLine = null
      this.currentLine = null
    }
  }
})