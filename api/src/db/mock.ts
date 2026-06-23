// Banco de dados mockado em memória.
// Substitui a conexão real com o Postgres: espelha as tabelas do schema Drizzle
// (formato "externo", em inglês) e é a única fonte de dados enquanto a API roda
// apenas com mocks. Os adapters leem/escrevem aqui; os mappers traduzem para PT-BR.

export type DbPlayer = {
  id: string
  name: string
  level: 'user' | 'admin'
  isBanned: boolean
  createdAt: string
}

export type DbCard = {
  id: string
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  type: string
  attack: number
  defense: number
}

export type DbPlayerCard = {
  playerId: string
  cardId: string
}

export type DbTrade = {
  id: string
  sourcePlayerId: string
  targetPlayerId?: string
  status: 'open' | 'proposed' | 'completed'
  createdAt: string
}

export type DbTradeCard = {
  tradeId: string
  cardId: string
}

export type DbBattle = {
  id: string
  playerAId: string
  playerBId: string
  status: 'scheduled' | 'ongoing' | 'finished'
  winnerId?: string
  date: string
}

type MockDatabase = {
  players: DbPlayer[]
  cards: DbCard[]
  playerCards: DbPlayerCard[]
  trades: DbTrade[]
  tradeCards: DbTradeCard[]
  battles: DbBattle[]
}

// Tabelas mutáveis: os PATCH (ban/level/status) alteram estes registros em memória.
export const db: MockDatabase = {
  players: [
    { id: '1', name: 'João', level: 'user', isBanned: false, createdAt: '2024-05-12T00:00:00.000Z' },
    { id: '2', name: 'Maria', level: 'admin', isBanned: false, createdAt: '2024-05-12T00:00:00.000Z' },
    { id: '3', name: 'Carlos', level: 'user', isBanned: true, createdAt: '2024-05-12T00:00:00.000Z' },
  ],

  cards: [
    { id: 'carta-1', name: 'Charizard', rarity: 'rare', type: 'Fogo', attack: 85, defense: 40 },
    { id: 'carta-2', name: 'Venusaur', rarity: 'epic', type: 'Grama', attack: 45, defense: 90 },
    { id: 'carta-3', name: 'Pikachu', rarity: 'common', type: 'Elétrico', attack: 60, defense: 35 },
    { id: 'carta-4', name: 'Mewtwo', rarity: 'legendary', type: 'Psíquico', attack: 70, defense: 65 },
  ],

  playerCards: [
    { playerId: '1', cardId: 'carta-1' },
    { playerId: '1', cardId: 'carta-3' },
    { playerId: '2', cardId: 'carta-2' },
    { playerId: '3', cardId: 'carta-4' },
    { playerId: '3', cardId: 'carta-1' },
  ],

  trades: [
    { id: 'troca-1', sourcePlayerId: '1', status: 'open', createdAt: '2026-06-01T10:00:00.000Z' },
    { id: 'troca-2', sourcePlayerId: '2', targetPlayerId: '3', status: 'proposed', createdAt: '2026-06-02T14:30:00.000Z' },
    { id: 'troca-3', sourcePlayerId: '3', targetPlayerId: '1', status: 'completed', createdAt: '2026-06-03T09:15:00.000Z' },
  ],

  tradeCards: [
    { tradeId: 'troca-1', cardId: 'carta-1' },
    { tradeId: 'troca-1', cardId: 'carta-3' },
    { tradeId: 'troca-2', cardId: 'carta-2' },
    { tradeId: 'troca-3', cardId: 'carta-4' },
  ],

  battles: [
    { id: 'batalha-1', playerAId: '1', playerBId: '2', status: 'finished', winnerId: '1', date: '2026-06-01' },
    { id: 'batalha-2', playerAId: '2', playerBId: '3', status: 'ongoing', date: '2026-06-01' },
    { id: 'batalha-3', playerAId: '3', playerBId: '1', status: 'scheduled', date: '2026-06-02' },
  ],
}

export function findPlayerName(id: string): string {
  return db.players.find((p) => p.id === id)?.name ?? ''
}
