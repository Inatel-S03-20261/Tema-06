import { z } from 'zod'

export const cardRaritySchema = z.enum(['Comum', 'Rara', 'Épica', 'Lendária'])

export const cardSchema = z.object({
  id: z.string(),
  nome: z.string(),
  raridade: cardRaritySchema,
  tipo: z.string(),
  ataque: z.number().int(),
  defesa: z.number().int(),
})

export const cardParamsSchema = z.object({
  id: z.string(),
})

export const listCardsQuerySchema = z.object({
  nome: z.string().optional(),
  tipo: z.string().optional(),
})

export type Card = z.infer<typeof cardSchema>
export type CardRarity = z.infer<typeof cardRaritySchema>
