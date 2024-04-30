import { ConditionType } from '../../types'
import NameComponent from '../Name.vue'
import TypeComponent from '../Type.vue'
import { defineComponent, h, Fragment } from 'vue'

// define a empty component for empty condition
const EmptyCondition = defineComponent({
  expose: ['next'],
  name: 'EmptyCondition',
  render() {
    return h(Fragment, null)
  },
  methods: {
    next(nodes: any[]) {
      return nodes
    }
  }
})

export enum ConditionTypeMap {
  NAME = 'name',
  TYPE = 'type',
  EMPTY = 'empty',
}

export const ConditionComponentMap: Record<ConditionType['type'], any> = {
  name: {
    // todo!: 迁移 name 字段到 vue 单文件组件内，通过自定义代码块导出描述内容，并且可以在此处通过 `组件.name` 导出
    name: '根据节点名字匹配',
    component: NameComponent
  },
  type: {
    name: '根据节点类型匹配',
    component: TypeComponent
  },
  empty: {
    name: '无条件',
    component: EmptyCondition
  },
}