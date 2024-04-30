<script lang="ts" setup>
import OperateButton from '../../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import UserLeftDrawer from '@/components/UserLeftDrawer/index.vue';
import { ref, Teleport } from 'vue';
import QueryResultShow from './components/QueryResultShow.vue';
import QueryRequestSelect from './components/QueryRequestSelect/index.vue';
import Node from '@/three/object/components/node';
import { ElButton } from 'element-plus';

const show = ref(false)
function open() {
  show.value = !show.value
}

const nodes = ref<Node[]>([])
const QuerySelectRef = ref()
const showResult = ref(false)

function setPointSelected(nodes: Node[], selected: boolean) {
  nodes.forEach((node) => {
    node.setPointSelected(selected)
  })
}

async function onQuery() {
  showResult.value = true
  nodes.value = await QuerySelectRef.value?.queryNodes()
  setPointSelected(nodes.value as Node[], true)
}

function onBack() {
  showResult.value = false
  setPointSelected(nodes.value as Node[], false)
}
</script>

<template>
  <Teleport to="body">
    <UserLeftDrawer v-model:show="show">
      <template #title>
        <div class="title_container">
          根据条件查询节点
          <ElButton @click="show = false">关闭</ElButton>
        </div>
      </template>
      <KeepAlive>
        <QueryRequestSelect v-if="!showResult" ref="QuerySelectRef" @query="onQuery" />
        <QueryResultShow v-else :nodes="(nodes as Node[])" @back="onBack" />
      </KeepAlive>
    </UserLeftDrawer>
  </Teleport>
  <OperateButton popover="根据条件查询节点" :popover-width="180" @click="open">
    <SvgIcon name="find" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>

<style lang="scss" scoped>
.title_container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>