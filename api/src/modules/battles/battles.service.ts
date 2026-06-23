import type { IBattlesRepository, IBattlesService } from './battles.interface.js'
import { battlesRepository } from './battles.repository.js'
import type { Battle, BattleStatus } from './battles.schema.js'
import { TtlCache } from '../../shared/cache.js'

class BattlesService implements IBattlesService {
  private cache = new TtlCache<Battle[] | Battle>()

  constructor(private repo: IBattlesRepository) {}

  async findAll(status?: BattleStatus, playerId?: string): Promise<Battle[]> {
    const key = `findAll:${status ?? ''}:${playerId ?? ''}`
    const cached = this.cache.get(key) as Battle[] | undefined
    if (cached) return cached

    const battles = await this.repo.findAll(status, playerId)
    this.cache.set(key, battles)
    return battles
  }

  async findById(id: string): Promise<Battle> {
    const key = `findById:${id}`
    const cached = this.cache.get(key) as Battle | undefined
    if (cached) return cached

    const battle = await this.repo.findById(id)
    this.cache.set(key, battle)
    return battle
  }
}

export const battlesService = new BattlesService(battlesRepository)
