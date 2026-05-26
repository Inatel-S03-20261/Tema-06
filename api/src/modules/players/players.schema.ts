import { z } from 'zod'

export const playerLevelSchema = z.enum(['user', 'admin'])

export const playerSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  level: playerLevelSchema,
  isBanned: z.boolean(),
  createdAt: z.date(),
})

export const playerParamsSchema = z.object({
  id: z.uuid(),
})

export const listPlayersQuerySchema = z.object({
  name: z.string().optional(),
})

export const updateBanBodySchema = z.object({
  isBanned: z.boolean(),
})

export const updateLevelBodySchema = z.object({
  level: playerLevelSchema,
})

export type Player = z.infer<typeof playerSchema>
export type PlayerLevel = z.infer<typeof playerLevelSchema>
export type ListQuery = z.infer<typeof listPlayersQuerySchema>
export type PlayerParams = z.infer<typeof playerParamsSchema>
export type UpdateBanBody = z.infer<typeof updateBanBodySchema>
export type UpdateLevelBody = z.infer<typeof updateLevelBodySchema>