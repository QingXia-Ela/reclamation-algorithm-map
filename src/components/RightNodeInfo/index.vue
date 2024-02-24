<!-- 
  该组件用于展示某一个节点的详细信息
 -->
<script setup>
import Mask from '@/components/Mask.vue'
import NodeInfoEditor from './components/NodeInfoEditor.vue'
import { useCurrentNodeState } from '@/store/dev/currentNodeState';
import { computed, onMounted, ref, watch, nextTick } from 'vue';
import { ElDrawer } from 'element-plus';
</script>

<template>
  <NodeInfoEditor />
  <!-- <template v-if="!hide || active">
    <Mask ref="maskRef" @click="currentNodeState.hide()" :active="active" :opacity="0" />
    <div class="info_wrapper" :style="{ transform: active ? 'translateX(0)' : 'translateX(100%)' }">
    </div>
  </template> -->
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
  padding: 20px;
  background: #fff;
  transition: transform 0.3s;
}
</style>