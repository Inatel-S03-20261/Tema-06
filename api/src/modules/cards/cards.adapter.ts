// Mock no formato "externo" (em inglês). O mapper traduz para português.
export type RawCard = {
  id: string
  name: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  type: string
  attack: number
  defense: number
}

const rawCards: RawCard[] = [
  { id: 'carta-1', name: 'Charizard', rarity: 'rare', type: 'Fogo', attack: 85, defense: 40 },
  { id: 'carta-2', name: 'Venusaur', rarity: 'epic', type: 'Grama', attack: 45, defense: 90 },
  { id: 'carta-3', name: 'Pikachu', rarity: 'common', type: 'Elétrico', attack: 60, defense: 35 },
  { id: 'carta-4', name: 'Mewtwo', rarity: 'legendary', type: 'Psíquico', attack: 70, defense: 65 },
]

export async function fetchAll(name?: string, type?: string): Promise<RawCard[]> {
  return rawCards.filter((card) => {
    const nomeOk = !name || card.name.toLowerCase().includes(name.toLowerCase())
    const tipoOk = !type || card.type.toLowerCase() === type.toLowerCase()
    return nomeOk && tipoOk
  })
}

export async function fetchById(id: string): Promise<RawCard> {
  const found = rawCards.find((card) => card.id === id)
  if (!found) throw new Error(`Carta ${id} não encontrada`)
  return found
}
