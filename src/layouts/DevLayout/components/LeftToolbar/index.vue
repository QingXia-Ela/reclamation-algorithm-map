<script setup lang="ts">
import { useToolbar } from '@/store/dev/toolbar';
import { computed, ref, watch } from 'vue';
import { ElDrawer } from 'element-plus';
import HighLightShortestRoad from './components/highLightShortestRoad.vue';
import { useMask } from '@/store/dev/mask';
import { useGlobalState } from '@/store/dev/globalState';

const toolbar = useToolbar()
const mask = useMask()
const globalState = useGlobalState()

const show = ref(false)

watch(
  () => toolbar.show,
  (n) => {
    show.value = n
  }
)

watch(
  () => show.value,
  (n) => {
    if (n !== toolbar.show) {
      toolbar.toggleToolbar(n)
      mask.setActive(n)
      globalState.setMouseOccupy(n)
    }
  }
)
</script>

<template>
  <el-drawer v-model="show" title="开发模式功能栏" direction="ltr">
    <high-light-shortest-road />
  </el-drawer>
</template>