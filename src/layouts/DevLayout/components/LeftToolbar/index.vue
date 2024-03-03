<script setup lang="ts">
import { useToolbar } from '@/store/dev/toolbar';
import { computed } from 'vue';
import { ElDrawer } from 'element-plus';

const toolbar = useToolbar()

const show = computed(() => toolbar.show)
</script>

<template>
  <el-drawer v-model="show" title="开发模式功能栏" direction="ltr">
    <span>Hi, there!</span>
  </el-drawer>
</template>