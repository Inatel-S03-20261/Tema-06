import * as tradesAdapter from './trades.adapter.js'
import * as tradesMapper from './trades.mapper.js'
import * as cardsRepository from '../cards/cards.repository.js'
import type { RawTrade } from './trades.adapter.js'
import type { Trade, TradeStatus } from './trades.schema.js'

async function toTrade(raw: RawTrade): Promise<Trade> {
  const cartasOfertadas = await Promise.all(
    raw.offeredCardIds.map((id) => cardsRepository.findById(id)),
  )
  return tradesMapper.toInternal(raw, cartasOfertadas)
}

export async function findAll(status?: TradeStatus, playerId?: string): Promise<Trade[]> {
  const raw = await tradesAdapter.fetchAll(status, playerId)
  return Promise.all(raw.map(toTrade))
}

export async function findById(id: string): Promise<Trade> {
  const raw = await tradesAdapter.fetchById(id)
  return toTrade(raw)
}

export async function updateStatus(id: string, status: TradeStatus): Promise<Trade> {
  const raw = await tradesAdapter.updateStatus(id, status)
  return toTrade(raw)
}
