<script setup>
import { ElSelect, ElOption, ElInput } from 'element-plus';
import { ref } from 'vue';

const input = ref()

/**
 * @param {import('@/three/object/components/node').default[]} nodes 
 */
// todo!: 提升搜索体验，例如输入石头可以展示所有石头有关的节点
// todo!: 可能存在性能问题，需要优化
function next(nodes) {
  // if (!selectName.value) return nodes
  // return nodes.filter(node => selectName.value === node.options.name)
  return nodes.filter(node => `${node.options.name} ${node.options.type} ${node.options.description}`.includes(input.value))
}

defineExpose({
  next
})
</script>

<template>
  <!-- <el-select placeholder="选择节点名字" v-model="selectName">
    <el-option v-for="name in NodeName" :key="name" :label="name" :value="name" />
  </el-select> -->
  <el-input v-model="input" placeholder="输入所有可能匹配的文字" />
</template>