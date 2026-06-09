import * as tradesAdapter from './trades.adapter.js'
import * as tradesMapper from './trades.mapper.js'
import type { Trade, TradeStatus } from './trades.schema.js'

export async function findAll(status?: TradeStatus, playerId?: string): Promise<Trade[]> {
  const raw = await tradesAdapter.fetchAll(status, playerId)
  return raw.map(tradesMapper.toInternal)
}

export async function findById(id: string): Promise<Trade> {
  const raw = await tradesAdapter.fetchById(id)
  return tradesMapper.toInternal(raw)
}

export async function updateStatus(id: string, status: TradeStatus): Promise<Trade> {
  const raw = await tradesAdapter.updateStatus(id, status)
  return tradesMapper.toInternal(raw)
}
