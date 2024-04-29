import { ConditionType } from '../../types'
import NameComponent from '../Name.vue'
import TypeComponent from '../Type.vue'
import { defineComponent } from 'vue'

// define a empty component for empty condition
const EmptyCondition = defineComponent({
  expose: ['next'],
  name: 'EmptyCondition',
  render() {
    return null
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