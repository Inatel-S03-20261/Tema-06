import type { FastifyInstance } from 'fastify'
import { docsPlugin } from './docs.js'
import { corsPlugin } from './cors.js'
import { createBrokerPlugin } from '../broker/broker.plugin.js'
import { RabbitMQConsumer } from '../broker/rabbitmq.consumer.js'
import { MockBrokerConsumer } from '../broker/mock.consumer.js'

export async function registerPlugins(app: FastifyInstance): Promise<void> {
  await app.register(corsPlugin)
  await app.register(docsPlugin)

  // Sem BROKER_URL → consumer mockado (a API sobe sem RabbitMQ).
  const consumer = process.env.BROKER_URL
    ? new RabbitMQConsumer()
    : new MockBrokerConsumer()

  await app.register(createBrokerPlugin(consumer))
}
