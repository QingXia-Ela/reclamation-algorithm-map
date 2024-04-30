<template>
  <div class="condition_wrapper">
    <div class="condition_select">
      <el-select v-model="conditionComponentType" placeholder="选择一个条件...">
        <el-option v-for="(v, k) in ConditionComponentMap" :key="k" :label="v.name" :value="k">
        </el-option>
      </el-select>
      <el-button @click="$emit('remove')">移除该条件</el-button>
    </div>
    <div v-if="ConditionComponent.name !== 'EmptyCondition'" class="condition_component_wrapper">
      <component :is="ConditionComponent" ref="componentRef" />
    </div>
  </div>
</template>

<script lang="ts" setup name="Condition">
import { ref, computed, watch, nextTick } from 'vue';
import { ConditionComponentMap, ConditionTypeMap } from './constants';
import { ElSelect, ElOption, ElButton } from 'element-plus';
import Node from '@/three/object/components/node';

const componentRef = ref()

const conditionComponentType = ref(ConditionTypeMap.EMPTY)

const ConditionComponent = computed(() => ConditionComponentMap[conditionComponentType.value].component)

function next(nodes: Node[]) {
  return componentRef.value?.next?.(nodes) || nodes
}

defineExpose({
  next
})
</script>

<style lang="scss" scoped>
.condition_wrapper {
  display: flex;
  flex-flow: column nowrap;
  padding-top: 1rem;
  border-top: 1px solid #555;
}

.condition_select {
  display: flex;
  gap: 1rem;
}

.condition_component_wrapper {
  margin-top: 1rem;
  border-radius: 0.5rem;
}
</style>