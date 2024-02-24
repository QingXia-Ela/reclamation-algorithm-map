<!-- 
  左上角鼠标位置提示组件

  手动监听地图核心事件并获取鼠标位置
 -->

<script setup lang="ts">
import core from '@/three';
import throttle from 'lodash/throttle';
import { onBeforeUnmount, onMounted } from 'vue';

const onMouseMove = throttle(() => {
  // todo!
}, 100)

onMounted(() => {
  core.addEventListener('mousemove', onMouseMove)
})

onBeforeUnmount(() => {
  core.removeEventListener('mousemove', onMouseMove)
})
</script>

<template></template>