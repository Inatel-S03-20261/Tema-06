import type { FastifyInstance } from 'fastify'
import {
  battleSchema,
  battleParamsSchema,
  listBattlesQuerySchema,
} from './battles.schema.js'
import { battlesController } from './battles.controller.js'

export async function battlesRoutes(router: FastifyInstance) {
  router.get('', {
    schema: {
      tags: ['battles'],
      summary: 'List battles',
      querystring: listBattlesQuerySchema,
      response: { 200: battleSchema.array() },
    },
    handler: battlesController.findAll.bind(battlesController),
  })

  router.get('/:id', {
    schema: {
      tags: ['battles'],
      summary: 'Get battle by ID',
      params: battleParamsSchema,
      response: { 200: battleSchema },
    },
    handler: battlesController.findById.bind(battlesController),
  })
}
