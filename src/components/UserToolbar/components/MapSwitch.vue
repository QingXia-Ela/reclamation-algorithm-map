<script setup>
import { MapData } from '@/constants/map';
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import core from '@/three';
import { ElNotification, ElDialog, ElRadioGroup, ElRadio, ElButton } from 'element-plus';
import { ref } from 'vue';
import { getMapJson } from '@/api/modules';

const open = ref(false)
const type = ref("main")

/**
 * @param type {import('@/three/types/map').MapType}
 */
function changeMap(type) {
  console.log(type);
  getMapJson(type)
    .then(async (map) => {
      await core.changeMap(map, type)
    })
    .finally(() => {
      open.value = false
    })
}
</script>

<template>
  <OperateButton popover="查看其他区域的地图" :popover-width="180" @click="open = true">
    <SvgIcon name="map" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
  <ElDialog v-model="open" title="选择要更换的地图" :before-close="() => open = false" append-to-body>
    <el-radio-group v-model="type">
      <el-radio v-for="item in MapData" :label="item.value" :key="item.value" size="large">
        {{ item.label }}
      </el-radio>
    </el-radio-group>
    <template #footer>
      <el-button @click="open = false">取消</el-button>
      <el-button type="primary" @click="changeMap(type)">更换地图</el-button>
    </template>
  </ElDialog>
</template>