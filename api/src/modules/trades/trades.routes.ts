import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  tradeSchema,
  tradeParamsSchema,
  listTradesQuerySchema,
  updateTradeStatusBodySchema,
} from './trades.schema.js'
import * as tradesController from './trades.controller.js'

export async function tradesRoutes(router: FastifyInstance) {
  router.get('', {
    schema: {
      tags: ['trades'],
      summary: 'List trades',
      querystring: listTradesQuerySchema,
      response: { 200: tradeSchema.array() },
    },
    handler: tradesController.list.bind(tradesController),
  })

  router.get('/:id', {
    schema: {
      tags: ['trades'],
      summary: 'Get trade by ID',
      params: tradeParamsSchema,
      response: { 200: tradeSchema },
    },
    handler: tradesController.findById.bind(tradesController),
  })

  router.patch('/:id/status', {
    schema: {
      tags: ['trades'],
      summary: 'Update trade status',
      params: tradeParamsSchema,
      body: updateTradeStatusBodySchema,
      response: { 200: tradeSchema },
    },
    handler: tradesController.updateStatus.bind(tradesController),
  })
}
