<script setup>
import { ElFormItem, ElSelect, ElOption } from "element-plus";
import { ref } from "vue";

/** @typedef {import('@/three/types/node').NodeProps} NodeProps */

// 外部 modal 双向绑定
const value = defineModel();

const WeatherData = [
  {
    value: "normal",
    label: "晴朗",
  },
  {
    value: "thunder",
    label: "阵雷",
  },
  {
    value: "thunder_storm",
    label: "雷暴",
  },
  {
    value: "heat",
    label: "骄阳天",
  },
  {
    value: "heat_wave",
    label: "烈阳天",
  },
  {
    value: "hot",
    label: "酷暑",
  },
  {
    value: "sandstorm",
    label: "沙暴",
  },
  {
    value: "big_sandstorm",
    label: "巨型沙暴",
  },
  {
    value: "acid_rain",
    label: "蚀雨",
  },
  {
    value: "drought",
    label: "干旱",
  },
];
</script>

<template>
  <el-form-item label="节点天气">
    <el-select v-model="value">
      <el-option
        v-for="item in WeatherData"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </el-form-item>
</template>
