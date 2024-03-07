<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

</script>

<template>
  <OperateButton popover="查找指定类型的节点" :popover-width="180">
    <SvgIcon name="find" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>