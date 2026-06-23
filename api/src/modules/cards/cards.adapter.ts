import { db } from '../../config/database.js'

// Formato "externo" (em inglês). O mapper traduz para português.
export type RawCard = {
  id: string
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  type: string
  attack: number
  defense: number
}

export async function fetchAll(name?: string, type?: string): Promise<RawCard[]> {
  return db.cards.filter((card) => {
    const nomeOk = !name || card.name.toLowerCase().includes(name.toLowerCase())
    const tipoOk = !type || card.type.toLowerCase() === type.toLowerCase()
    return nomeOk && tipoOk
  })
}

export async function fetchById(id: string): Promise<RawCard> {
  const found = db.cards.find((card) => card.id === id)
  if (!found) throw new Error(`Carta ${id} não encontrada`)
  return found
}
