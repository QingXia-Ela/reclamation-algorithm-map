<script setup>
import { MapData } from '@/constants/map';
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import core from '@/three';
import { ElNotification, ElDialog, ElRadioGroup, ElRadio, ElButton } from 'element-plus';
import { computed, ref } from 'vue';
import { getMapJson } from '@/api/modules';
import { useGlobalState } from '@/store/dev/globalState';
import { useStore } from '@nanostores/vue';
import i18n from '@/locales'

const globalState = useGlobalState()
const open = computed(() => globalState.openMapSelect)
const mapType = defineModel("mapType")

const FixedDungeonData = MapData.filter(item => item.fixed_dungeon)

/**
 * @param {typeof RIFT_MAPS_DATA} data 
 */
function handleRiftMaps(data) {
  const map = {}
  for (const item of data) {
    const [flag, type, ...rest] = item.name.split("-")

    const key = `${flag}-${type}`

    if (!map[key]) map[key] = []
    map[key].push({
      value: item.filename,
      label: rest.join("-")
    })
  }

  return Object.entries(map).map(([title, value]) => ({ title, value }))
}


const RadioData = [
  {
    "title": "主地图",
    "value": [MapData[0]]
  },
  {
    "title": "固定陌域",
    "value": FixedDungeonData
  },
  ...handleRiftMaps(RIFT_MAPS_DATA)
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
  <OperateButton :popover="$t('userToolbar.mapSwitch.popover')" :popover-width="180" @click="openMapSelect">
    <SvgIcon name="map" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
  <ElDialog v-model="open" :title="$t('userToolbar.mapSwitch.switch.title')" :before-close="closeMapSelect"
    append-to-body>
    <template v-for="data in RadioData" :key="data.title">
      <h3 class="type_title">{{ data.title }}</h3>
      <el-radio-group v-model="mapType">
        <el-radio v-for="item in data.value" :value="item.value" :key="item.value" size="large">
          {{ item.label?.length ? item.label : item.value }}
        </el-radio>
      </el-radio-group>
    </template>
    <template #footer>
      <el-button @click="closeMapSelect">{{ $t('userToolbar.mapSwitch.switch.cancel') }}</el-button>
      <el-button type="primary" @click="changeMap(mapType)">{{ $t('userToolbar.mapSwitch.switch.confirm') }}</el-button>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.type_title {
  margin-top: 1rem;

  &:first-child {
    margin-top: 0;
  }
}
</style>

<!-- todo!: add local i18n translate -->