<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const BorderData = [
  {
    value: "square",
    label: "正方形",
  },
  {
    value: "round",
    label: "圆形",
  },
  {
    value: "hexagon",
    label: "六边形",
  },
];
</script>

<template>
  <el-form-item label="节点边框类型">
    <el-select v-model="value">
      <el-option
        v-for="item in BorderData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
