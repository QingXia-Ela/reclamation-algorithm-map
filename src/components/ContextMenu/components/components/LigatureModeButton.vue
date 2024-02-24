<script setup lang="ts">
// todo!: 重构所有逻辑
import { ElButton, ElMessage, ElNotification } from 'element-plus'
import { useGlobalState } from '@/store/dev/globalState';
import { nextTick } from 'vue';
import core from '@/three';
import Node from '@/three/object/components/node';
import { saveDataToLocal } from '@/utils/three/localStoreMapData';

const state = useGlobalState()
let active = false

const edgeStack: { nid1: number, nid2: number }[] = []
const nodeStack: Node[] = []

function* showProcessMessage(msgs: string[] = []) {
  let handler = null
  for (const msg of msgs) {
    handler?.close()
    handler = ElNotification({
      type: 'info',
      title: '提示',
      message: msg,
      showClose: false,
      duration: 0
    })
    yield
  }
}

function cleanOperate() {
  nodeStack.forEach(node => {
    node.setPointSelected(false)
  })

  nodeStack.splice(0, nodeStack.length)
}

function startLigatureMode() {
  if (active) {
    ElMessage({
      type: "error",
      message: "已经进入连线模式"
    })
    return
  }

  active = true
  state.setMouseOccupy(true)

  const process = showProcessMessage([
    "当前为节点连线模式，请点击某个节点作为起点",
    "点击下一个节点以创建连接线，按下鼠标右键进行操作撤销，按 ESC 退出连线模式"
  ])

  // 我也不知道为什么要 nextTick，自动补全这样写
  nextTick(() => {
    process.next()
  })

  let firstClick = true
  const onNodeClick = (node: Node) => {

    if (firstClick) {
      node.setPointSelected(true, 0x1488f4)
      nodeStack.push(node)
      firstClick = false
      nextTick(() => {
        process.next()
      })
    }
    else {
      nodeStack.push(node)
      const [nid1, nid2] = nodeStack.slice(-2).map(node => node.nodeId)

      try {
        core.addEdgeByNodeIds(nid1, nid2)
        edgeStack.push({ nid1, nid2 })
        node.setPointSelected(true, 0x1488f4)

        // 其余点设为标准激活颜色
        nodeStack
          .filter(n => n.nodeId !== node.nodeId)
          .forEach(n => {
            n.setPointSelected(true)
          })
      } catch (e: any) {
        // 不是有边就是连接到自身，直接弹出首个元素来确保是从上个合法点开始连线，不需要重置选中状态
        nodeStack.pop()

        ElMessage({
          type: "error",
          message: e
        })
      }
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    if (e.button != 2) {
      return
    }

    const lastEdge = edgeStack.pop()
    if (lastEdge) {
      core.removeEdgeByNodeIds(lastEdge.nid1, lastEdge.nid2)
      nodeStack.pop()?.setPointSelected(false)
      nodeStack[nodeStack.length - 1]?.setPointSelected(true, 0x1488f4)
    }
  }

  const listenKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      active = false
      state.setMouseOccupy(false)
      core.removeEventListener('nodeclick', onNodeClick)
      document.removeEventListener('keydown', listenKeydown)
      document.removeEventListener('mouseup', onMouseUp)
      cleanOperate()
      saveDataToLocal(core)
      ElMessage({
        type: "success",
        message: "连线模式已退出"
      })
    }
  }

  core.addEventListener('nodeclick', onNodeClick)
  document.addEventListener('keydown', listenKeydown)
  document.addEventListener('mouseup', onMouseUp)
}
</script>

<template>
  <el-button type="primary" @click="startLigatureMode">进入节点连线模式</el-button>
</template>