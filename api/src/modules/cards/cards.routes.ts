import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { cardSchema, cardParamsSchema, listCardsQuerySchema } from './cards.schema.js'
import * as cardsController from './cards.controller.js'

export async function cardsRoutes(app: FastifyInstance) {
  const router = app.withTypeProvider<ZodTypeProvider>()

  router.get('', {
    schema: {
      tags: ['cards'],
      summary: 'List cards',
      querystring: listCardsQuerySchema,
      response: { 200: cardSchema.array() },
    },
    handler: cardsController.list,
  })

  router.get('/:id', {
    schema: {
      tags: ['cards'],
      summary: 'Get card by ID',
      params: cardParamsSchema,
      response: { 200: cardSchema },
    },
    handler: cardsController.findById,
  })
}
