import * as cardsRepository from './cards.repository.js'
import type { Card } from './cards.schema.js'

export async function list(name?: string, type?: string): Promise<Card[]> {
  return cardsRepository.findAll(name, type)
}

export async function findById(id: string): Promise<Card> {
  return cardsRepository.findById(id)
}
