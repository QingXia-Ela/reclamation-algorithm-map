<script setup>
import { ElButton } from 'element-plus';
import { computed, ref, watch } from 'vue';
import Condition from './components/Condition/index.vue';

const conditions = ref([])

// empty on init.
const conditionsRef = ref([])
</script>

<template>
  <div class="query_wrapper">
    <div class="query_item_container">
      <Condition v-for="(time, index) in conditions" :ref="conditionsRef[index]" :key="time"
        @remove="conditions.splice(index, 1)" />
      <div class="empty_tips" v-if="conditions.length === 0">❤ 什么条件都没有捏，点击下方添加筛选条件来筛♂选节点吧 ❤</div>
    </div>
    <div class="operate">
      <ElButton @click="conditions.push(+new Date())">+ 添加筛选条件</ElButton>
      <ElButton type="primary">查询满足条件的节点 (共{{ 114 }}个)</ElButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.query_wrapper {
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  height: 100%;
}

.query_item_container {
  flex: 1;
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  overflow: auto;
}

.operate {
  display: flex;
  justify-content: end;
}
</style>