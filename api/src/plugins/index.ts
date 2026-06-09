import type { FastifyInstance } from 'fastify'
import { docsPlugin } from './docs.js'
import { corsPlugin } from './cors.js'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await app.register(corsPlugin)
  await app.register(docsPlugin)
}
