// Banco de dados mockado em memória.
// Substitui a conexão real com o Postgres: espelha as tabelas do schema Drizzle
// (formato "externo", em inglês) e é a única fonte de dados enquanto a API roda
// apenas com mocks. Os adapters leem/escrevem aqui; os mappers traduzem para PT-BR.

export type DbPlayer = {
  id: string
  name: string
  level: 'user' | 'admin'
  isBanned: boolean
  // Distingue treinadores engajados (ativos) dos sem atividade recente (inativos).
  isActive: boolean
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
    { id: '1', name: 'Ash', level: 'user', isBanned: false, isActive: true, createdAt: '2026-06-23T18:39:00.000Z' },
    { id: '2', name: 'Misty', level: 'admin', isBanned: false, isActive: true, createdAt: '2026-06-23T18:27:00.000Z' },
    { id: '3', name: 'Brock', level: 'user', isBanned: true, isActive: false, createdAt: '2026-06-23T17:41:00.000Z' },
    { id: '4', name: 'Gary', level: 'user', isBanned: false, isActive: true, createdAt: '2026-06-20T09:00:00.000Z' },
    { id: '5', name: 'May', level: 'user', isBanned: false, isActive: true, createdAt: '2026-06-23T16:41:00.000Z' },
    { id: '6', name: 'Dawn', level: 'user', isBanned: false, isActive: false, createdAt: '2026-03-11T09:00:00.000Z' },
    { id: '7', name: 'Serena', level: 'admin', isBanned: false, isActive: true, createdAt: '2026-04-02T09:00:00.000Z' },
    { id: '8', name: 'Clemont', level: 'user', isBanned: false, isActive: true, createdAt: '2026-04-15T09:00:00.000Z' },
    { id: '9', name: 'Iris', level: 'user', isBanned: false, isActive: false, createdAt: '2026-02-19T09:00:00.000Z' },
    { id: '10', name: 'Cilan', level: 'user', isBanned: false, isActive: true, createdAt: '2026-05-08T09:00:00.000Z' },
    { id: '11', name: 'Tracey', level: 'user', isBanned: true, isActive: false, createdAt: '2026-05-21T09:00:00.000Z' },
    { id: '12', name: 'Max', level: 'user', isBanned: false, isActive: false, createdAt: '2026-01-30T09:00:00.000Z' },
  ],

  cards: [
    { id: 'carta-1', name: 'Charizard', rarity: 'rare', type: 'Fogo', attack: 85, defense: 40 },
    { id: 'carta-2', name: 'Arcanine', rarity: 'epic', type: 'Fogo', attack: 75, defense: 50 },
    { id: 'carta-3', name: 'Flareon', rarity: 'common', type: 'Fogo', attack: 65, defense: 45 },
    { id: 'carta-4', name: 'Blastoise', rarity: 'rare', type: 'Água', attack: 55, defense: 80 },
    { id: 'carta-5', name: 'Gyarados', rarity: 'rare', type: 'Água', attack: 90, defense: 45 },
    { id: 'carta-6', name: 'Vaporeon', rarity: 'common', type: 'Água', attack: 60, defense: 65 },
    { id: 'carta-7', name: 'Squirtle', rarity: 'common', type: 'Água', attack: 40, defense: 55 },
    { id: 'carta-8', name: 'Venusaur', rarity: 'epic', type: 'Planta', attack: 45, defense: 90 },
    { id: 'carta-9', name: 'Bulbasaur', rarity: 'common', type: 'Planta', attack: 35, defense: 45 },
    { id: 'carta-10', name: 'Leafeon', rarity: 'rare', type: 'Planta', attack: 70, defense: 60 },
    { id: 'carta-11', name: 'Pikachu', rarity: 'common', type: 'Elétrico', attack: 60, defense: 35 },
    { id: 'carta-12', name: 'Jolteon', rarity: 'rare', type: 'Elétrico', attack: 80, defense: 40 },
    { id: 'carta-13', name: 'Mewtwo', rarity: 'legendary', type: 'Psíquico', attack: 110, defense: 90 },
    { id: 'carta-14', name: 'Alakazam', rarity: 'epic', type: 'Psíquico', attack: 95, defense: 45 },
    { id: 'carta-15', name: 'Snorlax', rarity: 'rare', type: 'Normal', attack: 65, defense: 95 },
    { id: 'carta-16', name: 'Eevee', rarity: 'common', type: 'Normal', attack: 45, defense: 50 },
    { id: 'carta-17', name: 'Ditto', rarity: 'rare', type: 'Normal', attack: 48, defense: 48 },
    { id: 'carta-18', name: 'Machamp', rarity: 'epic', type: 'Lutador', attack: 100, defense: 70 },
    { id: 'carta-19', name: 'Hitmonlee', rarity: 'rare', type: 'Lutador', attack: 90, defense: 55 },
    { id: 'carta-20', name: 'Onix', rarity: 'common', type: 'Pedra', attack: 50, defense: 100 },
  ],

  playerCards: [
    { playerId: '1', cardId: 'carta-1' },
    { playerId: '1', cardId: 'carta-11' },
    { playerId: '2', cardId: 'carta-4' },
    { playerId: '3', cardId: 'carta-20' },
    { playerId: '4', cardId: 'carta-13' },
    { playerId: '5', cardId: 'carta-8' },
    { playerId: '6', cardId: 'carta-11' },
    { playerId: '7', cardId: 'carta-5' },
    { playerId: '8', cardId: 'carta-12' },
    { playerId: '10', cardId: 'carta-15' },
  ],

  trades: [
    { id: 'troca-1', sourcePlayerId: '1', status: 'open', createdAt: '2026-01-10T10:00:00.000Z' },
    { id: 'troca-2', sourcePlayerId: '2', targetPlayerId: '4', status: 'proposed', createdAt: '2026-01-22T14:30:00.000Z' },
    { id: 'troca-3', sourcePlayerId: '3', targetPlayerId: '1', status: 'completed', createdAt: '2026-02-05T09:15:00.000Z' },
    { id: 'troca-4', sourcePlayerId: '4', status: 'open', createdAt: '2026-02-18T11:00:00.000Z' },
    { id: 'troca-5', sourcePlayerId: '5', targetPlayerId: '6', status: 'completed', createdAt: '2026-03-03T16:45:00.000Z' },
    { id: 'troca-6', sourcePlayerId: '7', status: 'open', createdAt: '2026-03-15T08:20:00.000Z' },
    { id: 'troca-7', sourcePlayerId: '1', targetPlayerId: '2', status: 'completed', createdAt: '2026-03-28T13:10:00.000Z' },
    { id: 'troca-8', sourcePlayerId: '8', status: 'open', createdAt: '2026-04-09T10:30:00.000Z' },
    { id: 'troca-9', sourcePlayerId: '9', targetPlayerId: '10', status: 'proposed', createdAt: '2026-04-20T15:00:00.000Z' },
    { id: 'troca-10', sourcePlayerId: '4', status: 'completed', createdAt: '2026-05-02T12:00:00.000Z' },
    { id: 'troca-11', sourcePlayerId: '6', targetPlayerId: '5', status: 'completed', createdAt: '2026-05-19T17:30:00.000Z' },
    { id: 'troca-12', sourcePlayerId: '1', status: 'open', createdAt: '2026-06-01T09:00:00.000Z' },
    { id: 'troca-13', sourcePlayerId: '2', targetPlayerId: '1', status: 'completed', createdAt: '2026-06-23T16:39:00.000Z' },
    { id: 'troca-14', sourcePlayerId: '5', status: 'open', createdAt: '2026-06-23T18:30:00.000Z' },
  ],

  tradeCards: [
    { tradeId: 'troca-1', cardId: 'carta-1' },
    { tradeId: 'troca-2', cardId: 'carta-4' },
    { tradeId: 'troca-3', cardId: 'carta-20' },
    { tradeId: 'troca-3', cardId: 'carta-11' },
    { tradeId: 'troca-4', cardId: 'carta-13' },
    { tradeId: 'troca-5', cardId: 'carta-1' },
    { tradeId: 'troca-5', cardId: 'carta-11' },
    { tradeId: 'troca-6', cardId: 'carta-8' },
    { tradeId: 'troca-7', cardId: 'carta-1' },
    { tradeId: 'troca-8', cardId: 'carta-11' },
    { tradeId: 'troca-8', cardId: 'carta-12' },
    { tradeId: 'troca-9', cardId: 'carta-5' },
    { tradeId: 'troca-10', cardId: 'carta-13' },
    { tradeId: 'troca-10', cardId: 'carta-1' },
    { tradeId: 'troca-11', cardId: 'carta-11' },
    { tradeId: 'troca-11', cardId: 'carta-8' },
    { tradeId: 'troca-12', cardId: 'carta-1' },
    { tradeId: 'troca-13', cardId: 'carta-4' },
    { tradeId: 'troca-13', cardId: 'carta-11' },
    { tradeId: 'troca-14', cardId: 'carta-8' },
    { tradeId: 'troca-14', cardId: 'carta-1' },
  ],

  battles: [
    { id: 'batalha-1', playerAId: '1', playerBId: '2', status: 'finished', winnerId: '1', date: '2026-01-12' },
    { id: 'batalha-2', playerAId: '4', playerBId: '3', status: 'finished', winnerId: '4', date: '2026-01-25' },
    { id: 'batalha-3', playerAId: '5', playerBId: '6', status: 'finished', winnerId: '5', date: '2026-02-08' },
    { id: 'batalha-4', playerAId: '7', playerBId: '8', status: 'scheduled', date: '2026-02-20' },
    { id: 'batalha-5', playerAId: '1', playerBId: '4', status: 'finished', winnerId: '4', date: '2026-03-05' },
    { id: 'batalha-6', playerAId: '2', playerBId: '9', status: 'ongoing', date: '2026-03-18' },
    { id: 'batalha-7', playerAId: '10', playerBId: '12', status: 'finished', winnerId: '10', date: '2026-04-02' },
    { id: 'batalha-8', playerAId: '1', playerBId: '3', status: 'finished', winnerId: '1', date: '2026-04-22' },
    { id: 'batalha-9', playerAId: '5', playerBId: '7', status: 'scheduled', date: '2026-05-10' },
    { id: 'batalha-10', playerAId: '4', playerBId: '2', status: 'finished', winnerId: '2', date: '2026-05-24' },
    { id: 'batalha-11', playerAId: '1', playerBId: '5', status: 'scheduled', date: '2026-06-05' },
    { id: 'batalha-12', playerAId: '2', playerBId: '3', status: 'finished', winnerId: '2', date: '2026-06-15' },
  ],
}

export function findPlayerName(id: string): string {
  return db.players.find((p) => p.id === id)?.name ?? ''
}
