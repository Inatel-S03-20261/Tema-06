import * as tradesRepository from './trades.repository.js'
import type { Trade, TradeStatus } from './trades.schema.js'

export async function list(status?: TradeStatus, playerId?: string): Promise<Trade[]> {
  return tradesRepository.findAll(status, playerId)
}

export async function findById(id: string): Promise<Trade> {
  return tradesRepository.findById(id)
}

export async function updateStatus(id: string, status: TradeStatus): Promise<Trade> {
  return tradesRepository.updateStatus(id, status)
}
