<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const BorderData = [
  {
    value: "main",
    label: "主地图",
  },
  {
    value: "dungeon",
    label: "陌域图",
  },
];
</script>

<template>
  <el-form-item label="地图选择">
    <el-select v-model="value">
      <el-option v-for="item in BorderData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
