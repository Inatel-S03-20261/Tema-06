import type { FastifyRequest, FastifyReply } from 'fastify'
import * as cardsService from './cards.service.js'
import type { z } from 'zod'
import type { listCardsQuerySchema, cardParamsSchema } from './cards.schema.js'

type ListQuery = z.infer<typeof listCardsQuerySchema>
type CardParams = z.infer<typeof cardParamsSchema>

export async function list(req: FastifyRequest<{ Querystring: ListQuery }>, reply: FastifyReply) {
  const { nome, tipo } = req.query
  const cards = await cardsService.list(nome, tipo)
  reply.send(cards)
}

export async function findById(req: FastifyRequest<{ Params: CardParams }>, reply: FastifyReply) {
  const card = await cardsService.findById(req.params.id)
  reply.send(card)
}
