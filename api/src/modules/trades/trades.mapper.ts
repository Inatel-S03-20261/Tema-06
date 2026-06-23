import type { RawTrade } from './trades.adapter.js'
import type { Trade, TradeStatus } from './trades.schema.js'
import type { Card } from '../cards/cards.schema.js'

const statusMap: Record<RawTrade['status'], TradeStatus> = {
  open: 'Aberta',
  proposed: 'Proposta',
  completed: 'Finalizada',
}

export function toInternal(raw: RawTrade, cartasOfertadas: Card[]): Trade {
  return {
    id: raw.id,
    jogadorOrigem: { id: raw.sourcePlayerId, nome: raw.sourcePlayerName },
    jogadorDestino:
      raw.targetPlayerId && raw.targetPlayerName
        ? { id: raw.targetPlayerId, nome: raw.targetPlayerName }
        : undefined,
    cartasOfertadas,
    status: statusMap[raw.status],
    criadoEm: raw.createdAt,
  }
}

export function toResponse(internal: Trade): Trade {
  return internal
}
