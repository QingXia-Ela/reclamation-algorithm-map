import { z } from 'zod'

const presetNode = [
  "base", // 驻扎地
  "camp",
  "market", // 后舍
  "normal"
]

/**
 * 基地节点
 */
const baseNodeSchema = z.object({
  preset: z.string().refine(val => presetNode.includes(val)),
  x: z.number(),
  y: z.number(),
})

/**
 * 普通节点
 */
const nodeSchema = z.object({
  nodeId: z.number(),
  x: z.number(),
  y: z.number(),
  name: z.string(),
  type: z.string(),
  weather: z.string(),
  resources: z.optional(z.array(z.string())),
  note: z.optional(z.string()),
  mainResources: z.optional(z.array(z.object({
    type: z.string(),
    count: z.number()
  }))),
  regularResources: z.optional(z.array(z.object({
    type: z.string(),
    count: z.number()
  }))),
})

export default function validateMapData(data: any) {
  const schema = z.object({
    nodes: z.array(
      z.object({
        preset: z.optional(z.string().refine(val => presetNode.includes(val))),
        ...nodeSchema.shape
      }).superRefine((val, ctx) => {
        if (val.preset) {
          const result = baseNodeSchema.safeParse(val);
          if (!result.success) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid preset node data",
              path: ctx.path,
            });
          }
        }
        else {
          const result = nodeSchema.safeParse(val);
          if (!result.success) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Invalid node data",
              path: ctx.path,
            });
          }
        }
      })
    ),
    adjancyList: z.record(z.array(z.number())),
    highlightRoute: z.array(z.object({
      id: z.string(),
      name: z.string(),
      nodes: z.array(z.number()),
      lineColor: z.custom<`0x${string}`>(() => true),
      bgColor: z.custom<`0x${string}`>(() => true),
    })).default([])
  })

  const result = schema.safeParse(data)
  if (!result.success) {
    return result.error
  }
}