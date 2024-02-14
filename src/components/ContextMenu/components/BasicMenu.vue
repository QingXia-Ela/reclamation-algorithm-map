<!-- 
  标准基础菜单

  - 在当前位置新建节点
 -->

<script setup>
import { ElButton } from 'element-plus'
import { useContextMenu } from '@/store/modules/contextMenu'
import { useCurrentNodeState } from '@/store/modules/currentNodeState';

const ctxStore = useContextMenu()
const currentNodeState = useCurrentNodeState()

function createNode() {
  currentNodeState.addNode({
    x: ctxStore.mapPos.x,
    y: ctxStore.mapPos.y
  })
  currentNodeState.show()
}
</script>

<template>
  <el-button type="primary" @click="createNode">在当前位置新建节点</el-button>
  <el-button type="primary" @click="createNode">从 JSON 加载地图数据</el-button>
  <el-button type="primary" @click="createNode">保存地图数据为 JSON</el-button>
</template>

<style lang="scss" scoped></style>