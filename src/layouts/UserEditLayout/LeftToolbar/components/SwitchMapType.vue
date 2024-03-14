<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElSelect, ElInput, ElCascader, ElFormItem } from 'element-plus';
import { highlightPointByType } from '@/three/utils/user/highlightPoint'
import core from '@/three';
import { MapData } from '@/constants/map';

const select = ref<string[]>([])

const typeValue = computed(() => select.value[select.value.length - 1])

const FixedDungeon = MapData.filter(item => item.fixed_dungeon)

const options = [
  MapData[0],
  {
    value: "fixed_dungeon",
    label: "固定陌域",
    children: FixedDungeon
  }
]
</script>

<template>
  <el-form-item class="form_item" label="地图类型">
    <el-cascader v-model="select" :options="options" />
    <el-input placeholder="地图类型源值会展示在此处..." v-model="typeValue" disabled style="width: 20rem; margin-left: 1rem;" />
  </el-form-item>
</template>