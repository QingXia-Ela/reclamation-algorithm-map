<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const TypeData = [
  {
    value: "hunt",
    label: "捕猎区",
  },
  {
    value: "collect",
    label: "资源区",
  },
  {
    value: "battle",
    label: "冲突区",
  },
  {
    value: "encounter",
    label: "奇遇",
  },
  {
    value: "cave",
    label: "无主地",
  },
  {
    value: "expedition",
    label: "集结区",
  },
  {
    value: "gate",
    label: "关隘",
  },
  {
    value: "mine",
    label: "荒废城镇",
  },
  {
    value: "market",
    label: "后舍",
  },
  {
    value: "nest",
    label: "要塞",
  },
  {
    value: "outpost",
    label: "哨站",
  },
  {
    value: "shop",
    label: "商店",
  },
  {
    value: "upgrade_battle",
    label: "营垒",
  },
  {
    value: "upgrade_scout",
    label: "岗哨",
  },
];
</script>

<template>
  <el-form-item label="节点类型">
    <el-select v-model="value">
      <el-option
        v-for="item in TypeData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
