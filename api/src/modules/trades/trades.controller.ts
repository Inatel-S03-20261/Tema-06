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
  const { status, jogadorId } = req.query
  const trades = await tradesService.list(status, jogadorId)
  reply.send(trades)
}

export async function findById(req: FastifyRequest<{ Params: TradeParams }>, reply: FastifyReply) {
  const trade = await tradesService.findById(req.params.id)
  reply.send(trade)
}

export async function updateStatus(req: FastifyRequest<{ Params: TradeParams; Body: UpdateStatusBody }>, reply: FastifyReply) {
  const trade = await tradesService.updateStatus(req.params.id, req.body.status)
  reply.send(trade)
}
