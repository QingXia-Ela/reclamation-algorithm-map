<script setup lang="ts">
import DevLayout from '@/layouts/DevLayout/index.vue';
import UserLayout from '@/layouts/UserLayout/index.vue';
// const isProduction = import.meta.env.MODE === 'production';
// todo!: 完善用户布局
const LayoutComponent = process.env.USE_DEVELOPER_LAYOUT
  ? DevLayout
  : UserLayout;
</script>

<template>
  <LayoutComponent />
</template>

<style scoped></style>
