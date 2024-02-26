<script setup>
import { NodeWeatherData } from "@/constants";
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();
</script>

<template>
  <el-form-item label="节点天气">
    <el-select v-model="value">
      <el-option v-for="item in NodeWeatherData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
