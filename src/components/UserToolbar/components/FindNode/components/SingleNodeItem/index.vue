<script lang="ts" setup>
import { IconData } from '@/assets/icons';
import NODE_ASSETS from '@/assets/three/icon/node';
import SvgIcon from '@/components/SvgIcon.vue';
import { NodeTypeData } from '@/constants';
import core from '@/three';
import Node from '@/three/object/components/node';
import { computed } from 'vue';

const node = defineModel<Node['options']>("node");

const name = computed(() => node.value?.name || "未知节点")
const type = computed(() => {
  const name = node.value?.type || "unknown"
  // assert: unknown cover name
  return NodeTypeData.find((item) => item.value === name)!.label
})

const icons = computed(() => {
  const resources = node.value?.mainResources || []
  return resources.map((item) => IconData[item.type])
})

function moveCamera(x = 0, y = 0) {
  core.setCameraPosition({ x, y })
}
</script>

<template>
  <div class="single_node_item" @click="moveCamera(node?.x, node?.y)">
    <div class="selected_icon ">
      <SvgIcon name="correct-c" color="#fff" />
    </div>
    <div class="node_type_img">
      <img class="node_img" :src="NODE_ASSETS['NODE_CAVE']" alt="">
    </div>
    <div class="node_info">
      <div class="type">{{ type }}</div>
      <div class="title">{{ name }}</div>
      <div class="icons">
        <div v-for="icon in icons" class="icon">
          <img class="icon_img" :src="icon" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selected_icon {
  width: 3rem;
  height: 3rem;
  position: absolute;
  right: 2rem;
  opacity: 0;
  transition: opacity .2s;
}

.single_node_item {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 1rem;
  width: 100%;
  height: 7.4rem;
  padding: 1rem;
  background-image: linear-gradient(to right, #242424, transparent);
  transition: background-color .2s, opacity .2s;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #333;

    .selected_icon {
      opacity: 0.16;
    }
  }

  &:active {
    opacity: 0.8;
  }

  &.active {
    background-color: rgba(var(--site-color), 0.8);

    .selected_icon {
      opacity: 0.9;
    }
  }
}

.node_type_img {
  width: 5rem;
  height: 5rem;
  background-color: #fff;
  border-radius: .4rem;

  .node_img {
    width: 100%;
    height: 100%;
    padding: .4rem;
    mix-blend-mode: difference;
  }
}

.node_info {
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-left: 1rem;

  .type {
    opacity: 0.8;
  }

  .title {
    font-size: 1.4rem;
    font-weight: 700;
  }

  .icons {
    display: flex;
    align-items: center;
    gap: .5rem;
    margin-top: 0.2rem;

    .icon {
      width: 1.6rem;
      height: 1.6rem;

      .icon_img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>