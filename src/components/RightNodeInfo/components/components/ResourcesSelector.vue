<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const ResourcesData = [
  {
    value: "water",
    label: "清水",
  },
  {
    value: "wood",
    label: "木材",
  },
  {
    value: "stone",
    label: "石材",
  },
  {
    value: "iron",
    label: "铁矿石",
  },
  {
    value: "diamond",
    label: "澄亮石",
  },
  {
    value: "venison",
    label: "圆圆肉片",
  },
  {
    value: "poultry",
    label: "羽兽翅肉",
  },
  {
    value: "crab",
    label: "蟹钳"
  },
  {
    value: "beef",
    label: "带腿骨肉"
  },
];
</script>

<template>
  <!-- <el-select v-model="value">
    <el-option
      v-for="item in ResourcesData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    />
  </el-select> -->
  <el-form-item label="资源类型">
    <el-select
      v-model="value"
      multiple
      collapse-tags
      collapse-tags-tooltip
      :max-collapse-tags="3"
      placeholder="无"
    >
      <el-option
        v-for="item in ResourcesData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
