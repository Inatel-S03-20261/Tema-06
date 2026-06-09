import { z } from 'zod'

export const tradeStatusSchema = z.enum(['Aberta', 'Proposta', 'Finalizada'])

const tradePlayerSchema = z.object({
  id: z.string(),
  nome: z.string(),
})

export const tradeSchema = z.object({
  id: z.string(),
  jogadorOrigem: tradePlayerSchema,
  jogadorDestino: tradePlayerSchema.optional(),
  status: tradeStatusSchema,
  criadoEm: z.string(),
})

export const tradeParamsSchema = z.object({
  id: z.string(),
})

export const listTradesQuerySchema = z.object({
  status: tradeStatusSchema.optional(),
  jogadorId: z.string().optional(),
})

export const updateTradeStatusBodySchema = z.object({
  status: tradeStatusSchema,
})

export type Trade = z.infer<typeof tradeSchema>
export type TradeStatus = z.infer<typeof tradeStatusSchema>
