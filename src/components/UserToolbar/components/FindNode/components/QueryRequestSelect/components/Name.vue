<script setup>
import { ElSelect, ElOption } from 'element-plus';
import { NodeNameToTypeMap } from '@/components/RightNodeInfo/components/entity';
import { ref } from 'vue';

const NodeName = Object.keys(NodeNameToTypeMap)

const selectName = ref()

function next(nodes) {
  if (!selectName.value) return nodes
  return nodes.filter(node => selectName.value === node.type)
}

defineExpose({
  next
})
</script>

<template>
  <el-select placeholder="选择节点名字" v-model="selectName">
    <el-option v-for="name in NodeName" :key="name" :label="name" :value="name" />
  </el-select>
</template>