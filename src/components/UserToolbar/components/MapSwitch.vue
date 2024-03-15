<script setup>
import { MapData } from '@/constants/map';
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import core from '@/three';
import { ElNotification, ElDialog, ElRadioGroup, ElRadio, ElButton } from 'element-plus';
import { computed, ref } from 'vue';
import { getMapJson } from '@/api/modules';
import { useGlobalState } from '@/store/dev/globalState';

const globalState = useGlobalState()
const open = computed(() => globalState.openMapSelect)
const type = ref("main")

const FixedDungeonData = MapData.filter(item => item.fixed_dungeon)

const RadioData = [
  {
    "title": "主地图",
    "value": [MapData[0]]
  },
  {
    "title": "固定陌域",
    "value": FixedDungeonData
  },
  {
    "title": "百变陌域(暂无具体地图名称)",
    "value": []
  }
]

/**
 * @param type {import('@/three/types/map').MapType}
 */
function changeMap(type) {
  getMapJson(type)
    .then(async (map) => {
      if (map.type === core.type) return
      await core.changeMap(map, type)
    })
    .finally(() => {
      closeMapSelect()
    })
}

function openMapSelect() {
  globalState.setOpenMapSelect(true)
}

function closeMapSelect() {
  globalState.setOpenMapSelect(false)
}
</script>

<template>
  <OperateButton popover="查看其他区域的地图" :popover-width="180" @click="openMapSelect">
    <SvgIcon name="map" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
  <ElDialog v-model="open" title="选择要更换的地图" :before-close="closeMapSelect" append-to-body>
    <template v-for="data in RadioData" :key="data.title">
      <h3>{{ data.title }}</h3>
      <el-radio-group v-model="type">
        <el-radio v-for="item in data.value" :label="item.value" :key="item.value" size="large">
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>

    <template #footer>
      <el-button @click="closeMapSelect">取消</el-button>
      <el-button type="primary" @click="changeMap(type)">更换地图</el-button>
    </template>
  </ElDialog>
</template>