<template>
  <div class="result_contain">
    <div class="info">
      <div class="text">共 {{ props.nodes?.length || 0 }} 个节点</div>
      <div class="back" @click="() => $emit('back')">返回筛选</div>
    </div>
    <div class="node_list">
      <SingleNodeItem v-for="node in props.nodes" :key="node.id" :node="node.options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Node from '@/three/object/components/node';
import SingleNodeItem from './SingleNodeItem/index.vue';

const props = defineProps<{
  nodes: Node[]
}>()

defineEmits(['back'])
</script>

<style lang="scss" scoped>
.result_contain {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 5%;
}

.back {
  font-size: 1.2rem;
  color: rgb(252, 64, 64);
  cursor: pointer;
}

.node_list {
  display: flex;
  height: 95%;
  flex-direction: column;
  gap: 1.4rem;
  padding-right: 1rem;
  overflow: auto;
}
</style>