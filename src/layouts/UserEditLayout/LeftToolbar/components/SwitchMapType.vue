<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ElSelect, ElInput, ElCascader, ElFormItem } from 'element-plus';
import { MapData } from '@/constants/map';

const FixedDungeon = MapData.filter(item => item.fixed_dungeon)

const options = [
  MapData[0],
  {
    value: "fixed_dungeon",
    label: "固定陌域",
    children: FixedDungeon
  },
  {
    value: "sandbox_1_rift_unknown",
    label: "制作用陌域",
    children: []
  }
]

const select = defineModel<string>()

const selectArr = ref([])

watch(() => selectArr.value, (n) => {
  select.value = selectArr.value?.length ? selectArr.value[selectArr.value.length - 1] : ""
})
</script>

<template>
  <el-form-item class="form_item" label="地图类型">
    <el-cascader v-model="selectArr" :options="options" />
    <el-input placeholder="地图类型源值会展示在此处..." v-model="select" disabled style="width: 12rem; margin-left: 1rem;" />
  </el-form-item>
</template>