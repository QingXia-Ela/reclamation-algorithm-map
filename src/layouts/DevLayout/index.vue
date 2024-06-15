<!-- 
  开发者布局

  具备功能：

  - crud 节点
  - 保存数据为 JSON 和本地
 -->

<script setup lang="ts">
import TopLeftMousePos from './components/TopLeftMousePos/index.vue'
import RightNodeState from './components/RightNodeState/index.vue'
import LeftToolbar from './components/LeftToolbar/index.vue'
import ContextMenu from '@/components/ContextMenu/index.vue'
import GlobalMask from '@/components/GlobalMask.vue';
import UserLevelInfoSidebar from '@/components/UserLevelInfoSidebar/index.vue'
import UserToolbar from '@/components/UserToolbar/index.vue'
import UserAnnouncement from '@/components/UserAnnouncement/index.vue'
import UserLeftDrawer from '@/components/UserLeftDrawer/index.vue'

import { onMounted } from 'vue';
import { ElNotification } from 'element-plus';

onMounted(() => {
  if (__DEV__) {
    ElNotification({
      title: "提示",
      message: "当前为开发者模式，在地图上使用右键打开开发者选单",
      type: "success",
    })
  }
  else if (__DESKTOP__) { /* empty */ }
  else if (process.env.NODE_ENV === "production") {
    ElNotification({
      title: "提示",
      message: "当前为在线网页，资源加载速度较慢，请耐心等待；你可以在地图底部打开操作菜单",
      type: "warning",
      duration: 10000
    })
  }
})
</script>

<template>
  <TopLeftMousePos />
  <RightNodeState />
  <LeftToolbar />
  <GlobalMask />
  <ContextMenu />
  <UserToolbar />
  <UserLevelInfoSidebar />
  <UserAnnouncement />
  <UserLeftDrawer title="用户侧边栏" />
  <slot />
</template>