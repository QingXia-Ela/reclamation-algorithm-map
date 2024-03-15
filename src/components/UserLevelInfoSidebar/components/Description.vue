<script setup>
import { computed } from 'vue';
import { useCurrentNode } from '@/store/users/currentNode';
import { NodeTypeData } from '@/constants';

const nodeStore = useCurrentNode()

const descriptionReg = /<@lv\.description>(.*?)<\/>/

function complieNote2Html(note = "") {
  let res = note.replace("\\n", "<br><br>")

  // 捕获替换文字
  const description = res.match(descriptionReg)
  if (description) {
    res = res.replace(descriptionReg, `<span class="note">${description[1]}</span>`)
  }

  return res
}

// todo!: 增加描述处理函数，需要处理部分有色字和换行 (<@lv.description>替换文字</>)
const description = computed(() => nodeStore.node?.options.note)
</script>

<template>
  <div class="description" v-html="complieNote2Html(description)"></div>
</template>

<style lang="scss" scoped>
.description {
  width: 80%;
  height: 7rem;
  margin: 0 3.6rem;
  color: #fff;
}

:deep(.note) {
  color: #e4e23a;
  font-weight: 700;
  margin-right: .3rem;
}
</style>