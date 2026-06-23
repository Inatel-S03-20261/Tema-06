import type { IBattlesMapper } from './battles.interface.js'
import type { RawBattle } from './battles.adapter.js'
import type { Battle, BattleStatus } from './battles.schema.js'

const statusMap: Record<RawBattle['status'], BattleStatus> = {
  scheduled: 'Agendada',
  ongoing: 'Em andamento',
  finished: 'Finalizada',
}

class BattlesMapper implements IBattlesMapper {
  toInternal(raw: unknown): Battle {
    const r = raw as RawBattle
    return {
      id: r.id,
      jogadorA: { id: r.playerAId, nome: r.playerAName },
      jogadorB: { id: r.playerBId, nome: r.playerBName },
      status: statusMap[r.status],
      vencedorId: r.winnerId,
      data: r.date,
    }
  }

  toResponse(battle: Battle): Battle {
    return battle
  }
}

export const battlesMapper = new BattlesMapper()
