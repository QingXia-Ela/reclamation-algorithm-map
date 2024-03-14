<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElSelect, ElInput, ElCascader, ElFormItem } from 'element-plus';
import { highlightPointByType } from '@/three/utils/user/highlightPoint'
import core from '@/three';
import { MapData } from '@/constants/map';

const size = ref<number>(90)
</script>

<template>
  <el-form-item class="form_item" label="地图背景大小">
    <el-input type="number" placeholder="背景大小，陌域地图通常设置为 90" v-model="size" />
  </el-form-item>
</template>