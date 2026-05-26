import type { FastifyInstance } from 'fastify'
import {
  playerSchema,
  playerParamsSchema,
  listPlayersQuerySchema,
  updateBanBodySchema,
  updateLevelBodySchema,
} from './players.schema.js'
import * as playersController from './players.controller.js'

export async function playersRoutes(router: FastifyInstance) {
  router.get('/', {
    schema: {
      tags: ['players'],
      summary: 'List players',
      querystring: listPlayersQuerySchema,
      response: { 200: playerSchema.array() },
    },
    handler: playersController.list,
  })

  router.get('/:id', {
    schema: {
      tags: ['players'],
      summary: 'Get player by ID',
      params: playerParamsSchema,
      response: { 200: playerSchema },
    },
    handler: playersController.findById,
  })

  router.patch('/:id/ban', {
    schema: {
      tags: ['players'],
      summary: 'Ban or unban a player',
      params: playerParamsSchema,
      body: updateBanBodySchema,
      response: { 200: playerSchema },
    },
    handler: playersController.updateBan,
  })

  router.patch('/:id/level', {
    schema: {
      tags: ['players'],
      summary: 'Update player level',
      params: playerParamsSchema,
      body: updateLevelBodySchema,
      response: { 200: playerSchema },
    },
    handler: playersController.updateLevel,
  })
}
