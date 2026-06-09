import * as cardsAdapter from './cards.adapter.js'
import * as cardsMapper from './cards.mapper.js'
import type { Card } from './cards.schema.js'

export async function findAll(name?: string, type?: string): Promise<Card[]> {
  const raw = await cardsAdapter.fetchAll(name, type)
  return raw.map(cardsMapper.toInternal)
}

export async function findById(id: string): Promise<Card> {
  const raw = await cardsAdapter.fetchById(id)
  return cardsMapper.toInternal(raw)
}
