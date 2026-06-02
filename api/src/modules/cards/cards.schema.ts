import { z } from 'zod'

export const cardRaritySchema = z.enum(['common', 'rare', 'epic', 'legendary'])

export const cardSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  rarity: cardRaritySchema,
  type: z.string(),
  attack: z.number().int(),
  defense: z.number().int(),
})

export const cardParamsSchema = z.object({
  id: z.string().uuid(),
})

export const listCardsQuerySchema = z.object({
  name: z.string().optional(),
  type: z.string().optional(),
})

export type Card = z.infer<typeof cardSchema>
export type CardRarity = z.infer<typeof cardRaritySchema>
