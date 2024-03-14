<!-- 
  开发者布局

  具备功能：

  - crud 节点
  - 保存数据为 JSON 和本地
 -->

<script setup lang="ts">
import RightNodeInfo from '@/components/RightNodeInfo/index.vue'
import ContextMenu from '@/components/ContextMenu/index.vue'
import GlobalMask from '@/components/GlobalMask.vue';
import UserLevelInfoSidebar from '@/components/UserLevelInfoSidebar/index.vue'
import UserToolbar from '@/components/UserToolbar/index.vue'
import UserAnnouncement from '@/components/UserAnnouncement/index.vue'

import { onMounted } from 'vue';
import { ElNotification } from 'element-plus';

onMounted(() => {
  ElNotification({
    title: "提示",
    message: "当前为用户编辑模式，在地图上使用右键打开开发者选单",
    type: "success",
  })
})
</script>

<template>
  <RightNodeInfo />
  <GlobalMask />
  <ContextMenu />
  <UserToolbar />
  <UserLevelInfoSidebar />
  <UserAnnouncement />
  <slot />
</template>
