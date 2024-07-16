<!-- 
 该组件用于查看当前地图文件内包含的高亮路径
  -->

<template>
  <OperateButton :popover-width="300" :popover="$t('userToolbar.viewAnimateRoute.popover')">
    <SvgIcon name="route" color="#eee" style="width: 1.2rem; height: 1.2rem" />
    <template #popover>
      {{ $t('userToolbar.viewAnimateRoute.popover') }}
      <el-checkbox-group v-if="selectItem.length" v-model="selectLine">
        <el-checkbox v-for="item of selectItem" :key="item.id" :label="item.name" :value="item.id" />
      </el-checkbox-group>
      <div v-else>{{ $t('userToolbar.viewAnimateRoute.noRoute') }}</div>
    </template>
  </OperateButton>
</template>

<script lang="ts" setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {
  ElCheckbox,
  ElCheckboxGroup
} from 'element-plus';
import { onMounted, ref, watch } from 'vue'
import core from '@/three'
import { SaveMapData } from '@/three/types/data';

const selectLine = ref([])

const selectItem = ref<SaveMapData['highlightRoute']>([])

onMounted(() => {
  core.addEventListener('mapchange', (data) => {
    // todo!: fix data lost problem
    selectItem.value = data.highlightRoute || []
  })
})

watch(
  () => selectLine.value,
  (n) => {
    core.stopAllHighlightRoute()
    n.forEach((i) => core.highlightRoute(i))
  }
)
</script>

<style lang="scss" scoped></style>