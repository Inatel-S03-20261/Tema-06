import * as tradesAdapter from './trades.adapter.js'
import * as tradesMapper from './trades.mapper.js'
import * as tradesRepository from './trades.repository.js'
import type { TradeStatus } from './trades.schema.js'

export async function list(status?: TradeStatus, playerId?: string) {
  // TODO
}

export async function findById(id: string) {
  // TODO
}

export async function updateStatus(id: string, status: TradeStatus) {
  // TODO
}
