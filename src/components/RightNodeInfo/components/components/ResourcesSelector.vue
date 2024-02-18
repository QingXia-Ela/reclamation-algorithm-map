<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const ResourcesData = [
  {
    value: "water",
    label: "水",
  },
  {
    value: "wood",
    label: "木材",
  },
  {
    value: "vension",
    label: "鹿肉",
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
