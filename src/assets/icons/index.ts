export * from './food'
export * from './resource'

import { IconFoodData, IconFoodFormData, IconFoodType } from './food'
import { IconResourceData, IconResourceFormData, IconResourceType } from './resource'

export type IconType = IconFoodType | IconResourceType

const IconData = {
  ...IconFoodData,
  ...IconResourceData
}

const IconFormData = [
  ...IconFoodFormData,
  ...IconResourceFormData
]

export {
  // collect
  IconData,
  IconFormData
}