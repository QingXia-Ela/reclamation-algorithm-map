<script lang="ts" setup>
import { ElButton } from 'element-plus';
import { ref } from 'vue';
import Condition from './components/Condition/index.vue';
import core from '@/three';

const conditions = ref < number[] > ([])

// empty on init.
const conditionsRef = ref < any[] > ([])

const count = ref(0)

function queryNodes() {
  return new Promise((res) => {
    setTimeout(async () => {
      if (!conditions.value.length) {
        count.value = 0
        return []
      }
      let nodes = Object.values(core.DataHandle.nodeMap)

      for (const condition of conditionsRef.value) {
        if (!condition.next) {
          // console.warn()
          continue
        }
        if (Object.prototype.toString.call(condition.next) === '[object AsyncFunction]') {
          nodes = await condition.next(nodes)
        }
        else {
          nodes = condition.next(nodes)
        }
      }

      count.value = nodes.length
      res(nodes)
    });
  })
}

defineExpose({
  queryNodes
})
</script>

<template>
  <div class="query_wrapper" @click="queryNodes">
    <div class="query_item_container">
      <Condition v-for="(time, index) in conditions" ref="conditionsRef" :key="time"
        @remove="conditions.splice(index, 1)" />
      <div class="empty_tips" v-if="conditions.length === 0">❤ 什么条件都没有捏，点击下方添加筛选条件来筛♂选节点吧 ❤</div>
    </div>
    <div class="operate">
      <ElButton @click="conditions.push(+new Date())">+ 添加筛选条件</ElButton>
      <ElButton type="primary" :disabled="!conditions.length || count === 0">查询满足条件的节点 (共{{ count }}个)</ElButton>
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