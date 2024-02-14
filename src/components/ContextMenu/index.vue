<template>
  <transition v-show="ctxStore.visible">
    <!-- todo!: 优化样式，让他变得更像右键菜单 -->
    <el-card @click="ctxStore.hide()" class="box-card" :style="{ top: domPos.y + 'px', left: domPos.x + 'px' }">
      <BasicMenu />
    </el-card>
  </transition>
  <div class="mask" @click="ctxStore.hide()" :style="{ display: ctxStore.visible ? 'flex' : 'none' }"></div>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus'
import { useContextMenu } from '@/store/modules/contextMenu'
import { computed } from 'vue';
import BasicMenu from './components/BasicMenu.vue'

const ctxStore = useContextMenu()

const domPos = computed(() => ctxStore.domPos)
</script>

<style lang="scss" scoped>
.box-card {
  z-index: 1000;
  position: fixed;
  display: flex;
}

.mask {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.v-enter-from,
.v-leave-to {
  transform: scale(0.9);
  opacity: 0;
}
</style>