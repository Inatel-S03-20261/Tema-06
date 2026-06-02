import type { FastifyRequest, FastifyReply } from 'fastify'
import * as tradesService from './trades.service.js'
import type { z } from 'zod'
import type {
  listTradesQuerySchema,
  tradeParamsSchema,
  updateTradeStatusBodySchema,
} from './trades.schema.js'

type ListQuery = z.infer<typeof listTradesQuerySchema>
type TradeParams = z.infer<typeof tradeParamsSchema>
type UpdateStatusBody = z.infer<typeof updateTradeStatusBodySchema>

export async function list(req: FastifyRequest<{ Querystring: ListQuery }>, reply: FastifyReply) {
  // TODO
}

export async function findById(req: FastifyRequest<{ Params: TradeParams }>, reply: FastifyReply) {
  // TODO
}

export async function updateStatus(req: FastifyRequest<{ Params: TradeParams; Body: UpdateStatusBody }>, reply: FastifyReply) {
  // TODO
}
