<template>
  <div class="result_contain">
    <div class="info">
      <div class="text">共 {{ props.nodes?.length || 0 }} 个节点</div>
      <div class="back" @click="() => $emit('back')">返回筛选</div>
    </div>
    <SingleNodeItem />
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
  gap: 1.4rem;
  width: 100%;
  height: 100%;
  padding-right: 1rem;
}

.info {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.back {
  font-size: 1.2rem;
  color: rgb(252, 64, 64);
  cursor: pointer;
}
</style>