import fp from 'fastify-plugin'
import type { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

export const corsPlugin = fp(async (app: FastifyInstance): Promise<void> => {
  await app.register(fastifyCors, {
    origin: true, // reflete a origem da requisição (libera qualquer front em dev)
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
})
