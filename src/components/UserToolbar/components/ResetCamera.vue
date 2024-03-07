<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import core from '@/three'
</script>

<template>
  <OperateButton popover="回到地图中心" :popover-width="180" @click="core.setCameraPosition({ x: 0, y: 0 })">
    <SvgIcon name="local" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>