<script setup lang="ts">
import BottomToolbar from './components/BottomToolbar/index.vue'
import TopLeftMousePos from './components/TopLeftMousePos/index.vue'
import RightNodeState from './components/RightNodeState/index.vue'
import GlobalMask from '@/components/GlobalMask.vue';
</script>

<template>
  <TopLeftMousePos />
  <RightNodeState />
  <BottomToolbar />
  <GlobalMask />
  <slot />
</template>