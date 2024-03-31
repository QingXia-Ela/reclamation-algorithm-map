<script lang="ts" setup>
import OperateButton from '../../OperateButton.vue';
import SvgIcon from '@/components/SvgIcon.vue';
import UserLeftDrawer from '@/components/UserLeftDrawer/index.vue';
import { ref, Teleport } from 'vue';
import SingleNodeItem from './components/SingleNodeItem/index.vue';

function open() {
  show.value = !show.value
}

const show = ref(false)
</script>

<template>
  <Teleport to="body">
    <UserLeftDrawer title="查找节点" v-model:show="show">
      <SingleNodeItem />
    </UserLeftDrawer>
  </Teleport>
  <OperateButton popover="根据条件查询节点" :popover-width="180" @click="open">
    <SvgIcon name="find" color="#eee" style="width: 1.2rem; height: 1.2rem" />
  </OperateButton>
</template>