<script setup lang="ts">
import { ElButton, ElMessage, ElNotification } from 'element-plus'
import { useGlobalState } from '@/store/dev/globalState';
import { nextTick } from 'vue';
import core from '@/three';
import Node from '@/three/object/components/node';

const state = useGlobalState()
let active = false

function* showProcessMessage(msgs: string[] = []) {
  let handler = null
  for (const msg of msgs) {
    handler?.close()
    handler = ElNotification({
      type: 'info',
      title: '提示',
      message: msg,
      duration: 0
    })
    yield
  }
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

  nextTick(() => {
    process.next()
  })

  let firstClick = true
  const onNodeClick = (node: Node) => {
    console.log(node);
    if (firstClick) {
      firstClick = false
      nextTick(() => {
        process.next()
      })
    }
  }

  const listenKeydown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      active = false
      state.setMouseOccupy(false)
      core.removeEventListener('nodeclick', onNodeClick)
      document.removeEventListener('keydown', listenKeydown)
      ElMessage({
        type: "success",
        message: "连线模式已退出"
      })
    }
  }

  core.addEventListener('nodeclick', onNodeClick)
  document.addEventListener('keydown', listenKeydown)
}
</script>

<template>
  <el-button type="primary" @click="startLigatureMode">进入节点连线模式</el-button>
</template>