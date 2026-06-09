import { z } from 'zod'

export const BATTLES_QUEUE = 'battles.finished'

// schema do que a equipe de batalha publica
export const battleFinishedMessage = z.object({
  battleId: z.string().uuid(),
  player1Id: z.string().uuid(),
  player2Id: z.string().uuid(),
  winnerId: z.string().uuid().nullable(),
  rounds: z
    .array(
      z.object({
        roundNumber: z.number().int(),
        player1PokemonId: z.number().int(),
        player2PokemonId: z.number().int(),
        roundWinnerId: z.string().uuid().nullable(),
      })
    )
    .optional(),
  finishedAt: z.string().datetime().optional(),
})

export type BattleFinishedMessage = z.infer<typeof battleFinishedMessage>

export async function onBattleFinished(msg: unknown) {
  const data = battleFinishedMessage.parse(msg)
  
  console.log(`battle finished: id=${data.battleId} winner=${data.winnerId ?? 'draw'}`)
}
