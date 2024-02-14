<!-- 
  该组件用于展示某一个节点的详细信息
 -->
<script setup>
import Mask from '@/components/Mask.vue'
import NodeInfoEditor from './components/NodeInfoEditor.vue'
import { useCurrentNodeState } from '@/store/modules/currentNodeState';
import { computed, onMounted, ref, watch } from 'vue';
const currentNodeState = useCurrentNodeState()

const maskRef = ref()

const active = computed(() => currentNodeState.showSidebar)
// const active = ref(false)

const hide = ref(!currentNodeState.showSidebar)

watch(active, () => {
  setTimeout(() => {
    hide.value = !active.value
  }, 300);
})
</script>

<template>
  <template v-if="!hide || active">
    <Mask ref="maskRef" @click="currentNodeState.hide()" :active="active" />
    <div class="info_wrapper" :style="{ transform: active ? 'translateX(0)' : 'translateX(100%)' }">
      <NodeInfoEditor />
    </div>
  </template>
</template>

<style lang="scss" scoped>
.info_wrapper {
  z-index: 100;
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  min-width: 400px;
  max-width: 700px;
  height: 100%;
  background: #fff;
  transition: transform 0.3s;
}
</style>