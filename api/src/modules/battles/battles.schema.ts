import { z } from 'zod'

export const battleStatusSchema = z.enum(['Agendada', 'Em andamento', 'Finalizada'])

const battlePlayerSchema = z.object({
  id: z.string(),
  nome: z.string(),
})

export const battleSchema = z.object({
  id: z.string(),
  jogadorA: battlePlayerSchema,
  jogadorB: battlePlayerSchema,
  status: battleStatusSchema,
  vencedorId: z.string().optional(),
  data: z.string(),
})

export const battleParamsSchema = z.object({
  id: z.string(),
})

export const listBattlesQuerySchema = z.object({
  status: battleStatusSchema.optional(),
  jogadorId: z.string().optional(),
})

export type Battle = z.infer<typeof battleSchema>
export type BattleStatus = z.infer<typeof battleStatusSchema>
export type BattleParams = z.infer<typeof battleParamsSchema>
export type ListBattlesQuery = z.infer<typeof listBattlesQuerySchema>
