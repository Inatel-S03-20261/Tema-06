import type { RawCard } from './cards.adapter.js'
import type { Card, CardRarity } from './cards.schema.js'

const rarityMap: Record<RawCard['rarity'], CardRarity> = {
  common: 'Comum',
  rare: 'Rara',
  epic: 'Épica',
  legendary: 'Lendária',
}

export function toInternal(raw: RawCard): Card {
  return {
    id: raw.id,
    nome: raw.name,
    raridade: rarityMap[raw.rarity],
    tipo: raw.type,
    ataque: raw.attack,
    defesa: raw.defense,
  }
}

export function toResponse(internal: Card): Card {
  return internal
}
