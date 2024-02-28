import { z } from 'zod'
// import { NodeProps } from '../types/node'
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
        resources: z.optional(z.array(z.string())),
        note: z.optional(z.string()),
        mainResources: z.optional(z.record(
          z.string(),
          z.number()
        )),
        regularResources: z.optional(z.record(
          z.string(),
          z.number()
        ))
      })
    ),
    adjancyList: z.record(z.array(z.number()))
  })
  const result = schema.safeParse(data)
  if (!result.success) {
    return result.error
  }
}