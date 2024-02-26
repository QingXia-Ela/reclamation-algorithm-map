import { z } from 'zod'
// import { SaveMapData } from '../types/data'

export default function validateMapData(data: any) {
  const schema = z.object({
    nodes: z.array(
      z.object({
        nodeId: z.number(),
        x: z.number(),
        y: z.number(),
        name: z.string(),
        type: z.string(),
        weather: z.string(),
        resources: z.array(z.string()),
        note: z.optional(z.string()),
      })
    ),
    adjancyList: z.record(z.array(z.number()))
  })
  const result = schema.safeParse(data)
  if (!result.success) {
    return result.error
  }
}