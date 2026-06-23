import type { FastifyRequest, FastifyReply } from 'fastify'
import type { Trade, TradeStatus, TradeParams, ListTradesQuery, UpdateTradeStatusBody } from './trades.schema.js'
import type { Card } from '../cards/cards.schema.js'

export interface ITradesRepository {
  findAll(status?: TradeStatus, playerId?: string): Promise<Trade[]>
  findById(id: string): Promise<Trade>
  updateStatus(id: string, status: TradeStatus): Promise<Trade>
}

export interface ITradesService {
  list(status?: TradeStatus, playerId?: string): Promise<Trade[]>
  findById(id: string): Promise<Trade>
  updateStatus(id: string, status: TradeStatus): Promise<Trade>
}

export interface ITradesController {
  list(req: FastifyRequest<{ Querystring: ListTradesQuery }>, reply: FastifyReply): Promise<void>
  findById(req: FastifyRequest<{ Params: TradeParams }>, reply: FastifyReply): Promise<void>
  updateStatus(req: FastifyRequest<{ Params: TradeParams; Body: UpdateTradeStatusBody }>, reply: FastifyReply): Promise<void>
}

export interface ITradesAdapter {
  fetchAll(status?: TradeStatus, playerId?: string): Promise<unknown[]>
  fetchById(id: string): Promise<unknown>
  updateStatus(id: string, status: TradeStatus): Promise<unknown>
}

export interface ITradesMapper {
  toInternal(raw: unknown, cartasOfertadas: Card[]): Trade
  toResponse(trade: Trade): Trade
}
