<script setup>
import UserLevelInfoSidebar from '@/components/UserLevelInfoSidebar/index.vue'
import { ElNotification } from 'element-plus';
import { onMounted } from 'vue';

onMounted(() => {
  process.env.NODE_ENV === "production" && (
    ElNotification({
      title: "提示",
      message: "当前为生产环境部署页面，背景加载速度较慢，请耐心等待",
      type: "warning",
      duration: 10000
    })
  )
})
</script>

<template>
  <UserLevelInfoSidebar />
</template>