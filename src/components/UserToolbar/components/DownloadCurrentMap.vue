<script setup>
import { useStore } from '@nanostores/vue';
import { getMapJson } from '@/api/modules';
import saveTextFile from '@/utils/file/saveTextFile';
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const mapType = defineModel("mapType")

function download(type) {
  getMapJson(type).then((res) => {
    saveTextFile(JSON.stringify(res), `生息演算地图_${type}.json`)
  })
}
</script>

<template>
  <OperateButton :popover="$t('userToolbar.downloadCurrentMap.popover')" :popover-width="180"
    @click="download(mapType)">
    <SvgIcon name="download" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>