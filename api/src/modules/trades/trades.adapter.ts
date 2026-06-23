import type { TradeStatus } from './trades.schema.js'
import { db, findPlayerName, type DbTrade } from '../../db/mock.js'

// Formato "externo" (status em inglês). O mapper traduz para português.
export type RawTrade = {
  id: string
  sourcePlayerId: string
  sourcePlayerName: string
  targetPlayerId?: string
  targetPlayerName?: string
  offeredCardIds: string[]
  status: 'open' | 'proposed' | 'completed'
  createdAt: string
}

const statusParaIngles: Record<TradeStatus, RawTrade['status']> = {
  Aberta: 'open',
  Proposta: 'proposed',
  Finalizada: 'completed',
}

// Junta a tabela de trades com players (nomes) e trade_cards (cartas ofertadas).
function toRawTrade(trade: DbTrade): RawTrade {
  return {
    id: trade.id,
    sourcePlayerId: trade.sourcePlayerId,
    sourcePlayerName: findPlayerName(trade.sourcePlayerId),
    targetPlayerId: trade.targetPlayerId,
    targetPlayerName: trade.targetPlayerId
      ? findPlayerName(trade.targetPlayerId)
      : undefined,
    offeredCardIds: db.tradeCards
      .filter((tc) => tc.tradeId === trade.id)
      .map((tc) => tc.cardId),
    status: trade.status,
    createdAt: trade.createdAt,
  }
}

export async function fetchAll(status?: TradeStatus, playerId?: string): Promise<RawTrade[]> {
  return db.trades
    .filter((trade) => {
      const statusOk = !status || trade.status === statusParaIngles[status]
      const jogadorOk =
        !playerId || trade.sourcePlayerId === playerId || trade.targetPlayerId === playerId
      return statusOk && jogadorOk
    })
    .map(toRawTrade)
}

export async function fetchById(id: string): Promise<RawTrade> {
  const found = db.trades.find((trade) => trade.id === id)
  if (!found) throw new Error(`Troca ${id} não encontrada`)
  return toRawTrade(found)
}

export async function updateStatus(id: string, status: TradeStatus): Promise<RawTrade> {
  const trade = db.trades.find((t) => t.id === id)
  if (!trade) throw new Error(`Troca ${id} não encontrada`)
  trade.status = statusParaIngles[status]
  return toRawTrade(trade)
}
