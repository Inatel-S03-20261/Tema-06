import type { TradeStatus } from './trades.schema.js'

export async function findAll(status?: TradeStatus, playerId?: string) {
  // TODO
}

export async function findById(id: string) {
  // TODO
}

export async function updateStatus(id: string, status: TradeStatus) {
  // TODO
}
