export interface EmptyConditionType {
  type: 'empty'
}

export interface NodeNameConditionType {
  type: 'name'
}

export interface NodeTypeConditionType {
  type: 'type'
}

export interface TextRegexConditionType {
  type: 'text_regex'
}

export type ConditionType = EmptyConditionType |
  NodeNameConditionType |
  NodeTypeConditionType |
  TextRegexConditionType