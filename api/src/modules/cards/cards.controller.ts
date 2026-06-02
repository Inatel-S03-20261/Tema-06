import type { FastifyRequest, FastifyReply } from 'fastify'
import * as cardsService from './cards.service.js'
import type { z } from 'zod'
import type { listCardsQuerySchema, cardParamsSchema } from './cards.schema.js'

type ListQuery = z.infer<typeof listCardsQuerySchema>
type CardParams = z.infer<typeof cardParamsSchema>

export async function list(req: FastifyRequest<{ Querystring: ListQuery }>, reply: FastifyReply) {
  // TODO
}

export async function findById(req: FastifyRequest<{ Params: CardParams }>, reply: FastifyReply) {
  // TODO
}
