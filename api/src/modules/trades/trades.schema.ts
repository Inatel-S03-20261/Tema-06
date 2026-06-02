import { z } from 'zod'

export const tradeStatusSchema = z.enum(['open', 'proposed', 'completed'])

export const tradeSchema = z.object({
  id: z.string().uuid(),
  sourcePlayerId: z.string().uuid(),
  targetPlayerId: z.string().uuid().optional(),
  status: tradeStatusSchema,
  createdAt: z.string().datetime(),
})

export const tradeParamsSchema = z.object({
  id: z.string().uuid(),
})

export const listTradesQuerySchema = z.object({
  status: tradeStatusSchema.optional(),
  playerId: z.string().uuid().optional(),
})

export const updateTradeStatusBodySchema = z.object({
  status: tradeStatusSchema,
})

export type Trade = z.infer<typeof tradeSchema>
export type TradeStatus = z.infer<typeof tradeStatusSchema>
