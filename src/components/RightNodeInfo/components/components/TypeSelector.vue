<script setup>
import { NodeTypeData } from "@/constants";
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

// todo!: 增加外部值变化监听修改节点类型
</script>

<template>
  <el-form-item label="节点类型">
    <el-select v-model="value">
      <el-option v-for="item in NodeTypeData" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </el-form-item>
</template>
