<!-- 
  编辑节点表单

  节点声明：`src/three/types/node.ts` => `NodeProps`

  保存时机如下：
  - 输入框失去焦点
  - 数据变化
  - 侧边栏关闭时

  保存时需要弹出一个提示框
 -->

<script setup>
import { useCurrentNodeState } from '@/store/modules/currentNodeState';
import { ref } from 'vue';
import { ElForm } from 'element-plus'
import { DEFAULT_NODE_CONFIG } from '@/constants/three'

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

const currentNodeState = useCurrentNodeState()

/**
 * @type {import('vue').Ref<NodeProps>}
 */
const infoData = ref({
  ...DEFAULT_NODE_CONFIG
})
</script>

<template>
  <el-form :model="infoData"></el-form>
</template>

<style lang="scss" scoped></style>
