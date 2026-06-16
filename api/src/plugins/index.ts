import type { FastifyInstance } from 'fastify'
import { docsPlugin } from './docs.js'
import { corsPlugin } from './cors.js'
import { createBrokerPlugin } from '../broker/broker.plugin.js'
import { RabbitMQConsumer } from '../broker/rabbitmq.consumer.js'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await app.register(corsPlugin)
  await app.register(docsPlugin)
  await app.register(createBrokerPlugin(new RabbitMQConsumer()))
}
