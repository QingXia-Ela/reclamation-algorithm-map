<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();
</script>

<template>
  <el-form-item label="地图名字">
    <el-input v-model="value" />
  </el-form-item>
</template>
