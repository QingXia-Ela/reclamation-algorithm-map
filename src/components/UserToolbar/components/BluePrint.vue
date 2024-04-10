<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';
import core from '@/three'
</script>

<template>
  <OperateButton popover="前往驻扎地蓝图建设（该功能由思想意识官网实现）" :popover-width="180"
    @click="window.open('https://ak.hypergryph.com/ra/taleswithinthesand/blueprint')">
    <SvgIcon name="local" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>