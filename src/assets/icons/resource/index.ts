import parseBatchImportToAssets from "@/utils/parseBatchImportToAssets";

function parseAssets<T extends string>(assets: Record<string, string>): Record<T, string> {
  const res: Record<string, string> = {}

  for (const key in assets) {
    const name = key.split("_").pop()?.toLowerCase() as T
    res[name] = assets[key]
  }

  return res as Record<T, string>
}

const IconResourceDataAssets = parseBatchImportToAssets(
  import.meta.glob("./*.png", { eager: true })
)

export type IconResourceType = "diamond" |
  "dimensioncoin" |
  "gold" |
  "goodsundry" |
  "iron" |
  "stone" |
  "water" |
  "wood"

// console.log(Object.keys(IconResourceDataAssets).map((k) => `"${k.split("_").pop()?.toLowerCase()}"`).join(" | \n"));
const IconResourceData: Record<IconResourceType, string> = parseAssets<IconResourceType>(IconResourceDataAssets)

// todo!: add rest type
/** 用于表单的数据 */
const IconResourceFormData: Array<{
  value: IconResourceType,
  label: string
}> = [
    {
      value: "diamond",
      label: "澄亮石",
    },
    {
      value: "gold",
      label: "粗制赤金",
    },
    {
      value: "iron",
      label: "铁矿石",
    },
    {
      value: "stone",
      label: "石材",
    },
    {
      value: "water",
      label: "清水",
    },
    {
      value: "wood",
      label: "木材",
    },
    {
      value: "goodsundry",
      label: "其他掉落物品",
    }
  ];

export {
  IconResourceData,
  IconResourceDataAssets,
  IconResourceFormData
}