<script setup>
import { IconData } from '@/assets/icons';

/**
 * @type {{title: string, ResourceList: {type: string, count: number}[]}}
 */
const props = defineProps({
  title: String,
  ResourceList: Array
})

/**
 * 
 * @param {import('@/assets/icons').IconType} type 
 */
function getStyleByType(type) {
  switch (type) {
    case "wood":
      return `transform: translateX(-.12rem) translateY(.12rem);`
  }

  return ``
}

/** @type {import('@/three/types/node').NodeResource[]} */
const showNumEntity = [
  "crab"
]
</script>

<template>
  <div class="resource_list" v-show="props.ResourceList?.length">
    <div class="title">{{ props.title }}</div>
    <div class="item_container">
      <div class="item" v-for="(item, index) in props.ResourceList" :key="index">
        <img class="img" :style="getStyleByType(item.type)" :src="IconData[item.type]" :alt="item.type">
        <div class="count" v-show="item.count > 1 || showNumEntity.includes(item.type)">
          <span style="color: #fff;">{{ item.count }}</span>
          <span style="color: #aaa;">/{{ item.count }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item_container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.item {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50vh;
  background-color: #444;
}

.count {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  border-radius: .3rem;
  background-color: #000000dd;
  font-size: .8rem;
}

.img {
  width: 65%;
}

.title {
  color: #aaa;
  font-weight: 700;
  margin-bottom: 1rem;
}

.resource_list {
  width: 100%;
  padding: 1.5rem;
  border-radius: 1rem;
  background-color: #2d2d2db7;
}
</style>