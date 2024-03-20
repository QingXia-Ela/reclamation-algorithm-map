<script setup>
import { useStore } from '@nanostores/vue';
import { mapType } from './store';
import { getMapJson } from '@/api/modules';
import saveTextFile from '@/utils/file/saveTextFile';
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';

const mapState = useStore(mapType)

function download(type) {
  getMapJson(type).then((res) => {
    saveTextFile(JSON.stringify(res), `生息演算地图_${type}.json`)
  })
}
</script>

<template>
  <OperateButton popover="下载当前地图" :popover-width="180" @click="download(mapState.map)">
    <SvgIcon name="download" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>