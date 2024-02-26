<script setup>
import Node from '@/three/object/components/node';
import NODE_ASSETS from '@/assets/three/icon/node'
import { computed } from 'vue';
import { useCurrentNode } from '@/store/users/currentNode';
import { NodeTypeData } from '@/constants';

const nodeStore = useCurrentNode()

const type = computed(() => nodeStore.node?.options.type)
const typeTranslate = computed(() => NodeTypeData.find(item => item.value === type.value)?.label)
const url = computed(() => type.value ? NODE_ASSETS[`NODE_${nodeStore.node.options.type.toUpperCase()}`] : "")
const name = computed(() => nodeStore.node?.options.name)

</script>

<template>
  <div class="level_title">
    <img :src="url" alt="" style="height: 100%;" />
    <div class="sub_title">
      <div class="type_title">
        {{ typeTranslate }}
      </div>
      <div class="name_title">
        {{ name }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.level_title {
  display: flex;
  align-items: center;
  height: 7rem;
  padding: 1.4rem 3rem;
  background-image: linear-gradient(90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 60%, rgba(0, 0, 0, 0.9) 100%);
}

.sub_title {
  display: flex;
  flex-flow: column nowrap;
  margin-left: 1rem;
}

.type_title {
  color: #aaa;
  font-size: 1.2rem;
}

.name_title {
  color: #fff;
  font-size: 1.8rem;
}
</style>