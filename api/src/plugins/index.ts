import type { FastifyInstance } from 'fastify'
import { docsPlugin } from './docs.js'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await app.register(docsPlugin)
}
