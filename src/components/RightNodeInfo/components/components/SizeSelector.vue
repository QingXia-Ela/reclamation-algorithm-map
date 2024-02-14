<script setup>
import { ElFormItem, ElSelect, ElOption } from 'element-plus'
import { ref } from 'vue';

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel()

const SizeData = [
  {
    value: 'small',
    label: '小图标'
  },
  {
    value: 'large',
    label: '大图标'
  }
]
</script>

<template>
  <el-form-item label="节点尺寸">
    <el-select v-model="value">
      <el-option v-for="item in SizeData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
