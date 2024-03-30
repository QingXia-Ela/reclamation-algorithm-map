<!-- 
  标准基础菜单

  - 在当前位置新建节点
 -->

<script setup>
import { ElButton, ElMessage } from 'element-plus'
import { useContextMenu } from '@/store/dev/contextMenu'
import { useCurrentNodeState } from '@/store/dev/currentNodeState';
import getJSONDataFromCore from '@/utils/three/getJSONDataFromCore'
import saveTextFile from '@/utils/file/saveTextFile'
import loadTextFile from '@/utils/file/loadTextFile'
import { seralizeCurrentTime } from '@/utils/time'
import core from '@/three';
import { useGlobalState } from '@/store/dev/globalState';
import LigatureModeButton from './components/LigatureModeButton.vue'
import saveData from '@/utils/three/saveData';
import { useToolbar } from '@/store/dev/toolbar';
import { getMapJson } from '@/api/modules';

const ctxStore = useContextMenu()
const currentNodeState = useCurrentNodeState()
const state = useGlobalState()
const toolbar = useToolbar()

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
    const error = await core.loadData(data)

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

async function reloadCurrentTypeMap() {
  const map = await getMapJson(core.type, "/reclaimation-algorithm-map/edit/")
  await core.changeMap(map, core.type)
}

async function cleanAllNode() {
  const clean = confirm('确定要清空所有节点(不可恢复)？')

  if (clean) {
    core.removeAllPoint()
    currentNodeState.setNode(null)
    ElMessage({
      type: 'success',
      message: '清除成功'
    })
  }
}
</script>

<template>
  <div class="container">
    <el-button type="primary" @click="createNode">在鼠标单击位置新建节点</el-button>
    <el-button type="primary" @click="loadData">从 JSON 加载地图数据</el-button>
    <el-button type="primary" @click="saveData(core, true)">保存地图数据为 JSON</el-button>
    <el-button type="primary" @click="toolbar.showToolbar()">打开地图工具栏</el-button>
    <el-button type="primary" @click="cleanAllNode">清除所有节点(不可恢复)</el-button>
    <LigatureModeButton />
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: .8rem;

  .el-button {
    margin-left: 0;
  }
}
</style>