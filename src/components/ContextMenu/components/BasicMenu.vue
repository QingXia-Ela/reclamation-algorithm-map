<!-- 
  标准基础菜单

  - 在当前位置新建节点
 -->

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import { useContextMenu } from '@/store/modules/contextMenu'
import { useCurrentNodeState } from '@/store/modules/currentNodeState';
import getJSONDataFromCore from '@/utils/three/getJSONDataFromCore'
import saveTextFile from '@/utils/file/saveTextFile'
import loadTextFile from '@/utils/file/loadTextFile'
import { seralizeCurrentTime } from '@/utils/time'
import core from '@/three';

const ctxStore = useContextMenu()
const currentNodeState = useCurrentNodeState()

function createNode() {
  currentNodeState.addNode({
    x: ctxStore.mapPos.x,
    y: ctxStore.mapPos.y
  })
  currentNodeState.show()
}

async function loadData() {
  try {
    const data = JSON.parse(await loadTextFile())
    const error = core.loadData(data)

    if (error) {
      ElMessage({
        type: 'error',
        message: `该文件非地图格式数据！`
      })
    }
    else {
      ElMessage({
        type: 'success',
        message: `加载地图成功！`
      })
    }
  } catch (e) {
    ElMessage({
      type: 'error',
      message: `读取JSON文件失败，${e}`
    })
  }

}

function saveData() {
  const data = getJSONDataFromCore(core)
  const str = JSON.stringify(data, null, 2)
  saveTextFile(str, `生息演算地图数据 ${seralizeCurrentTime()}.json`)
}
</script>

<template>
  <el-button type="primary" @click="createNode">在鼠标单击位置新建节点</el-button>
  <el-button type="primary" @click="loadData">从 JSON 加载地图数据</el-button>
  <el-button type="primary" @click="saveData">保存地图数据为 JSON</el-button>
</template>

<style lang="scss" scoped></style>