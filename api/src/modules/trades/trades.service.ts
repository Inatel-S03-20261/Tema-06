import * as tradesRepository from './trades.repository.js'
import type { ITradesRepository, ITradesService } from './trades.interface.js'
import type { Trade, TradeStatus } from './trades.schema.js'
import { TtlCache } from '../../shared/cache.js'

class TradesService implements ITradesService {
  private cache = new TtlCache<Trade[] | Trade>()

  constructor(private repo: ITradesRepository) {}

  async list(status?: TradeStatus, playerId?: string): Promise<Trade[]> {
    const key = `list:${status ?? ''}:${playerId ?? ''}`
    const cached = this.cache.get(key) as Trade[] | undefined
    if (cached) return cached

    const trades = await this.repo.findAll(status, playerId)
    this.cache.set(key, trades)
    return trades
  }

  async findById(id: string): Promise<Trade> {
    const key = `findById:${id}`
    const cached = this.cache.get(key) as Trade | undefined
    if (cached) return cached

    const trade = await this.repo.findById(id)
    this.cache.set(key, trade)
    return trade
  }

  async updateStatus(id: string, status: TradeStatus): Promise<Trade> {
    const updated = await this.repo.updateStatus(id, status)
    this.cache.clear()
    return updated
  }
}

export const tradesService = new TradesService(tradesRepository)
