<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import { ElNotification } from 'element-plus';
import { ref } from 'vue';

function notice() {
  ElNotification({
    type: "info",
    message: "功能还在开发中，敬请期待"
  })
}
</script>

<template>
  <OperateButton popover="网站更新公告" :popover-width="180" @click="notice">
    <SvgIcon name="announce" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>