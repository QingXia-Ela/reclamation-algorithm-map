<script lang="ts" setup>
import Node from '@/three/object/components/node';
import { ElSelect, ElOption } from 'element-plus';
import { NodeTypeData } from '@/constants';
import { ref } from 'vue';

const selectType = ref()

function next(nodes: Node[]) {
  return nodes.filter(node => selectType.value === node.options.type)
}

defineExpose({
  next
})
</script>

<template>
  <el-select placeholder="选择节点类型" v-model="selectType">
    <el-option v-for="item in NodeTypeData" :key="item.value" :label="item.label" :value="item.value" />
  </el-select>
</template>