<!-- 
  全局背景遮罩组件，不推荐使用
 -->

<template>
  <div class="mask" :style="style"></div>
</template>

<script lang="ts" setup>
import { useMask } from '@/store/modules/mask';
import { computed } from 'vue';

const mask = useMask()

const style = computed(() => ({
  display: mask.active ? 'block' : 'none',
  backgroundColor: mask.color,
  opacity: mask.opacity
}))
</script>


<style lang="scss" scoped>
.mask {
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>