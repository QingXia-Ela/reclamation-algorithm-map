<script setup lang="ts">
import DevLayout from '@/layouts/DevLayout/index.vue';
// const isProduction = import.meta.env.MODE === 'production';
// todo!: 增加用户布局
const LayoutComponent = process.env.USE_DEVELOPER_LAYOUT
  ? DevLayout
  : DevLayout;
</script>

<template>
  <LayoutComponent />
</template>

<style scoped></style>
