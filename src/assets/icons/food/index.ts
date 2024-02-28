import parseBatchImportToAssets from "@/utils/parseBatchImportToAssets";

function parseAssets<T extends string>(assets: Record<string, string>): Record<T, string> {
  const res: Record<string, string> = {}

  for (const key in assets) {
    const name = key.split("_").pop()?.toLowerCase() as T
    res[name] = assets[key]
  }

  return res as Record<T, string>
}

const IconFoodDataAssets = parseBatchImportToAssets(
  import.meta.glob("./*.png", { eager: true })
)

export type IconFoodType = "beef" |
  "condiment" |
  "crab" |
  "egg" |
  "horn" |
  "mushroom" |
  "peper" |
  "poultry" |
  "sugar" |
  "supermeat" |
  "ttlmeat" |
  "venison" |
  "wheat"

const IconFoodData: Record<IconFoodType, string> = parseAssets<IconFoodType>(IconFoodDataAssets)

// todo!: add rest type
/** 用于表单的数据 */
const IconFoodFormData: Array<{
  value: IconFoodType,
  label: string
}> = [
    {
      value: "beef",
      label: "带腿骨肉"
    },
    {
      value: "condiment",
      label: "调味品",
    },
    {
      value: "crab",
      label: "蟹钳"
    },
    {
      value: "egg",
      label: "羽兽蛋",
    },
    {
      value: "horn",
      label: "乳香腺",
    },
    {
      value: "mushroom",
      label: "木屑菌",
    },
    {
      value: "peper",
      label: "野红角(辣椒)",
    },
    {
      value: "poultry",
      label: "鸡肉",
    },
    {
      value: "venison",
      label: "圆圆肉片",
    },
  ];

export {
  IconFoodData,
  IconFoodDataAssets,
  IconFoodFormData
}