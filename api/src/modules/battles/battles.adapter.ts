import type { IBattlesAdapter } from './battles.interface.js'
import type { BattleStatus } from './battles.schema.js'
import { db, findPlayerName, type DbBattle } from '../../db/mock.js'

// Formato "externo" (status em inglês). O mapper traduz para português.
export type RawBattle = {
  id: string
  playerAId: string
  playerAName: string
  playerBId: string
  playerBName: string
  status: 'scheduled' | 'ongoing' | 'finished'
  winnerId?: string
  date: string
}

const statusParaIngles: Record<BattleStatus, RawBattle['status']> = {
  Agendada: 'scheduled',
  'Em andamento': 'ongoing',
  Finalizada: 'finished',
}

// Junta a tabela de battles com players para preencher os nomes.
function toRawBattle(battle: DbBattle): RawBattle {
  return {
    id: battle.id,
    playerAId: battle.playerAId,
    playerAName: findPlayerName(battle.playerAId),
    playerBId: battle.playerBId,
    playerBName: findPlayerName(battle.playerBId),
    status: battle.status,
    winnerId: battle.winnerId,
    date: battle.date,
  }
}

class BattlesAdapter implements IBattlesAdapter {
  async fetchAll(status?: BattleStatus, playerId?: string): Promise<unknown[]> {
    return db.battles
      .filter((battle) => {
        const statusOk = !status || battle.status === statusParaIngles[status]
        const jogadorOk =
          !playerId || battle.playerAId === playerId || battle.playerBId === playerId
        return statusOk && jogadorOk
      })
      .map(toRawBattle)
  }

  async fetchById(id: string): Promise<unknown> {
    const found = db.battles.find((battle) => battle.id === id)
    if (!found) throw new Error(`Batalha ${id} não encontrada`)
    return toRawBattle(found)
  }
}

export const battlesAdapter = new BattlesAdapter()
