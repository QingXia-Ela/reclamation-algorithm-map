<!-- 
 该组件用于查看当前地图文件内包含的高亮路径
  -->

<template>
  <OperateButton :popover-width="180">
    <!-- 查看当前地图可用的高亮路线 -->
    <template #reference>
      <SvgIcon name="route" color="#eee" style="width: 1.2rem; height: 1.2rem" />
    </template>
    <el-radio-group v-model="selectLine">
      <el-radio :value="'无'"></el-radio>
    </el-radio-group>
  </OperateButton>
</template>

<script setup>
import OperateButton from '../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import {
  ElRadioGroup,
  ElRadio
} from 'element-plus';
import { ref } from 'vue'
import core from '@/three'

const selectLine = ref()

core.addEventListener('mapchange', (data) => {
  // data.
})
</script>

<style lang="scss" scoped></style>