import { z } from 'zod'
import { cardSchema } from '../cards/cards.schema.js'

export const tradeStatusSchema = z.enum(['Aberta', 'Proposta', 'Finalizada'])

const tradePlayerSchema = z.object({
  id: z.string(),
  nome: z.string(),
})

export const tradeSchema = z.object({
  id: z.string(),
  jogadorOrigem: tradePlayerSchema,
  jogadorDestino: tradePlayerSchema.optional(),
  cartasOfertadas: cardSchema.array(),
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
export type TradeParams = z.infer<typeof tradeParamsSchema>
export type ListTradesQuery = z.infer<typeof listTradesQuerySchema>
export type UpdateTradeStatusBody = z.infer<typeof updateTradeStatusBodySchema>
