import type { FastifyInstance } from 'fastify'
import {
  playerSchema,
  playerParamsSchema,
  listPlayersQuerySchema,
  updateBanBodySchema,
  updateLevelBodySchema,
} from './players.schema.js'
import { cardSchema } from '../cards/cards.schema.js'
import { playersController } from './players.controller.js'

export async function playersRoutes(router: FastifyInstance) {
  router.get('', {
    schema: {
      tags: ['players'],
      summary: 'List players',
      querystring: listPlayersQuerySchema,
      response: { 200: playerSchema.array() },
    },
    handler: playersController.findAll.bind(playersController),
  })

  router.get('/:id', {
    schema: {
      tags: ['players'],
      summary: 'Get player by ID',
      params: playerParamsSchema,
      response: { 200: playerSchema },
    },
    handler: playersController.findById.bind(playersController),
  })

  router.patch('/:id/ban', {
    schema: {
      tags: ['players'],
      summary: 'Ban or unban a player',
      params: playerParamsSchema,
      body: updateBanBodySchema,
      response: { 200: playerSchema },
    },
    handler: playersController.banById.bind(playersController),
  })

  router.patch('/:id/level', {
    schema: {
      tags: ['players'],
      summary: 'Change a player level',
      params: playerParamsSchema,
      body: updateLevelBodySchema,
      response: { 200: playerSchema },
    },
    handler: playersController.levelById.bind(playersController),
  })

  router.get('/:id/cards', {
    schema: {
      tags: ['players'],
      summary: "List a player's cards",
      params: playerParamsSchema,
      response: { 200: cardSchema.array() },
    },
    handler: playersController.findCards.bind(playersController),
  })
}
