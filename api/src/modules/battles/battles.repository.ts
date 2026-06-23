import type { IBattlesAdapter, IBattlesMapper, IBattlesRepository } from './battles.interface.js'
import { battlesAdapter } from './battles.adapter.js'
import { battlesMapper } from './battles.mapper.js'
import type { Battle, BattleStatus } from './battles.schema.js'

class BattlesRepository implements IBattlesRepository {
  constructor(
    private adapter: IBattlesAdapter,
    private mapper: IBattlesMapper,
  ) {}

  async findAll(status?: BattleStatus, playerId?: string): Promise<Battle[]> {
    const raw = await this.adapter.fetchAll(status, playerId)
    return raw.map((r) => this.mapper.toInternal(r))
  }

  async findById(id: string): Promise<Battle> {
    const raw = await this.adapter.fetchById(id)
    return this.mapper.toInternal(raw)
  }
}

export const battlesRepository = new BattlesRepository(battlesAdapter, battlesMapper)
