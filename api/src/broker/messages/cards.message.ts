import { z } from 'zod'

export const CARDS_QUEUE = 'cards.distributed'

// schema do que a equipe de distribuicao publica
export const cardDistributedMessage = z.object({
  playerId: z.string().uuid(),
  card: z.object({
    id: z.string().uuid(),
    name: z.string(),
    type: z.string(),
    rarity: z.enum(['common', 'rare', 'epic', 'legendary']),
    attack: z.number().int(),
    defense: z.number().int(),
  }),
})

export type CardDistributedMessage = z.infer<typeof cardDistributedMessage>

export async function onCardDistributed(msg: unknown) {
  const data = cardDistributedMessage.parse(msg)
  
  console.log(`card received: player=${data.playerId} card=${data.card.name}`)
}
