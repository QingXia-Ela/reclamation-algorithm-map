<!-- 
  开发者布局

  具备功能：

  - crud 节点
  - 保存数据为 JSON 和本地
 -->

<script setup lang="ts">
import BottomToolbar from './components/BottomToolbar/index.vue'
import TopLeftMousePos from './components/TopLeftMousePos/index.vue'
import RightNodeState from './components/RightNodeState/index.vue'
import ContextMenu from '@/components/ContextMenu/index.vue'
import GlobalMask from '@/components/GlobalMask.vue';

import { onMounted } from 'vue';
import { ElNotification } from 'element-plus';

onMounted(() => {
  ElNotification({
    title: "提示",
    message: "当前为开发者模式，在地图上使用右键打开开发者选单",
    type: "success",
    duration: 2000
  })
})
</script>

<template>
  <TopLeftMousePos />
  <RightNodeState />
  <BottomToolbar />
  <GlobalMask />
  <ContextMenu />
  <slot />
</template>