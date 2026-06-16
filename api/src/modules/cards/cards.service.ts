import * as cardsRepository from './cards.repository.js'
import type { ICardsRepository, ICardsService } from './cards.interface.js'
import type { Card } from './cards.schema.js'
import { TtlCache } from '../../shared/cache.js'

class CardsService implements ICardsService {
  private cache = new TtlCache<Card[] | Card>()

  constructor(private repo: ICardsRepository) {}

  async list(name?: string, type?: string): Promise<Card[]> {
    const key = `list:${name ?? ''}:${type ?? ''}`
    const cached = this.cache.get(key) as Card[] | undefined
    if (cached) return cached

    const cards = await this.repo.findAll(name, type)
    this.cache.set(key, cards)
    return cards
  }

  async findById(id: string): Promise<Card> {
    const key = `findById:${id}`
    const cached = this.cache.get(key) as Card | undefined
    if (cached) return cached

    const card = await this.repo.findById(id)
    this.cache.set(key, card)
    return card
  }
}

export const cardsService = new CardsService(cardsRepository)
