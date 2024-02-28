export * from './food'
export * from './resource'

import { IconFoodData, IconFoodFormData } from './food'
import { IconResourceData, IconResourceFormData } from './resource'

const IconData = {
  ...IconFoodData,
  ...IconResourceData
}

const IconFormData = [
  ...IconFoodFormData,
  ...IconResourceFormData
]

export {
  IconFoodData,
  IconResourceData,
  IconFoodFormData,
  IconResourceFormData,
  // collect
  IconData,
  IconFormData
}