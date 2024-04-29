export interface EmptyConditionType {
  type: 'empty'
}

export interface NodeNameConditionType {
  type: 'name'
}

export interface NodeTypeConditionType {
  type: 'type'
}

export type ConditionType = EmptyConditionType |
  NodeNameConditionType |
  NodeTypeConditionType