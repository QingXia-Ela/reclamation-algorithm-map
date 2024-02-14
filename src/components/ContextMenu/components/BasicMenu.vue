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
</template>