import { z } from 'zod'

export const playerLevelSchema = z.enum(['Usuário', 'Administrador'])

export const playerSchema = z.object({
  id: z.string(),
  nome: z.string(),
  nivel: playerLevelSchema,
  statusBanimento: z.boolean(),
})

export const playerParamsSchema = z.object({
  id: z.string(),
})

export const listPlayersQuerySchema = z.object({
  nome: z.string().optional(),
})

export const updateBanBodySchema = z.object({
  statusBanimento: z.boolean(),
})

export const updateLevelBodySchema = z.object({
  nivel: playerLevelSchema,
})

export const RawPlayer = z.object({
  id: z.string(),
  name: z.string(),
  level: z.enum(['user', 'admin']),
  isBanned: z.boolean(),
});

export type RawPlayer = z.infer<typeof RawPlayer>
export type Player = z.infer<typeof playerSchema>
export type PlayerLevel = z.infer<typeof playerLevelSchema>
export type ListQuery = z.infer<typeof listPlayersQuerySchema>
export type PlayerParams = z.infer<typeof playerParamsSchema>
export type UpdateBanBody = z.infer<typeof updateBanBodySchema>
export type UpdateLevelBody = z.infer<typeof updateLevelBodySchema>