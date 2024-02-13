<template>
  <el-card class="box-card"
    :style="{ top: domPos.y + 'px', left: domPos.x + 'px', display: ctxStore.visible ? 'flex' : 'none' }">
    <div v-for="o in 4" :key="o" class="text item">{{ 'List item ' + o }}</div>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus'
import { useContextMenu } from '@/store/modules/contextMenu'
import { computed, onUpdated } from 'vue';

const ctxStore = useContextMenu()

const domPos = computed(() => ctxStore.domPos)

onUpdated(() => {
  console.log(ctxStore.visible);
})
</script>

<style lang="scss" scoped>
.box-card {
  position: fixed;
  display: flex;
}
</style>