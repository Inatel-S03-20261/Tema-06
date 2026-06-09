import type { TradeStatus } from './trades.schema.js'

// Mock no formato "externo" (status em inglês). O mapper traduz para português.
export type RawTrade = {
  id: string
  sourcePlayerId: string
  sourcePlayerName: string
  targetPlayerId?: string
  targetPlayerName?: string
  status: 'open' | 'proposed' | 'completed'
  createdAt: string
}

const statusParaIngles: Record<TradeStatus, RawTrade['status']> = {
  Aberta: 'open',
  Proposta: 'proposed',
  Finalizada: 'completed',
}

// Store mutável: o PATCH /trades/:id/status altera estes dados em memória.
const rawTrades: RawTrade[] = [
  {
    id: 'troca-1',
    sourcePlayerId: '1',
    sourcePlayerName: 'João',
    status: 'open',
    createdAt: '2026-06-01T10:00:00.000Z',
  },
  {
    id: 'troca-2',
    sourcePlayerId: '2',
    sourcePlayerName: 'Maria',
    targetPlayerId: '3',
    targetPlayerName: 'Carlos',
    status: 'proposed',
    createdAt: '2026-06-02T14:30:00.000Z',
  },
  {
    id: 'troca-3',
    sourcePlayerId: '3',
    sourcePlayerName: 'Carlos',
    targetPlayerId: '1',
    targetPlayerName: 'João',
    status: 'completed',
    createdAt: '2026-06-03T09:15:00.000Z',
  },
]

export async function fetchAll(status?: TradeStatus, playerId?: string): Promise<RawTrade[]> {
  return rawTrades.filter((trade) => {
    const statusOk = !status || trade.status === statusParaIngles[status]
    const jogadorOk =
      !playerId || trade.sourcePlayerId === playerId || trade.targetPlayerId === playerId
    return statusOk && jogadorOk
  })
}

export async function fetchById(id: string): Promise<RawTrade> {
  const found = rawTrades.find((trade) => trade.id === id)
  if (!found) throw new Error(`Troca ${id} não encontrada`)
  return found
}

export async function updateStatus(id: string, status: TradeStatus): Promise<RawTrade> {
  const trade = rawTrades.find((t) => t.id === id)
  if (!trade) throw new Error(`Troca ${id} não encontrada`)
  trade.status = statusParaIngles[status]
  return trade
}
