<!-- 
  右侧节点状态组件

  该组件承担观察模式与编辑模式的侧边栏控制

  当一个节点被点击时，该组件从右侧弹出并展示组件状态

  节点类型声明: `src/three/types/node.ts` => `NodeProps`
 -->
<script setup>
import RightNodeInfo from '@/components/RightNodeInfo/index.vue'
</script>

<template>
  <RightNodeInfo />
</template>