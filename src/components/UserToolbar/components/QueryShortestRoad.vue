<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

</script>

<template>
  <OperateButton popover="查询两个节点的最短路线" :popover-width="180">
    <SvgIcon name="connect" color="#fff" style="width: 1.6rem; height: 1.6rem" />
  </OperateButton>
</template>