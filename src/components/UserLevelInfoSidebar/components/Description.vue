<script setup>
import { computed } from 'vue';
import { useCurrentNode } from '@/store/users/currentNode';
import { NodeTypeData } from '@/constants';

const nodeStore = useCurrentNode()
// todo!: 增加描述处理函数，需要处理部分有色字和换行 (<@lv.description>;\n)
const description = computed(() => nodeStore.node?.options.note)

</script>

<template>
  <div class="description"> {{ description }}</div>
</template>

<style lang="scss" scoped>
.description {
  width: 80%;
  height: 5rem;
  margin: 0 auto;
  color: #fff;
}
</style>