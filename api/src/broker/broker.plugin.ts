import fp from 'fastify-plugin'
import type { IBrokerConsumer } from './broker.interface.js'
import { CARDS_QUEUE, onCardDistributed } from './messages/cards.message.js'
import { BATTLES_QUEUE, onBattleFinished } from './messages/battles.message.js'

// injeta o consumer
export function createBrokerPlugin(consumer: IBrokerConsumer) {
  return fp(async (app) => {
    await consumer.connect()

    await consumer.subscribe(CARDS_QUEUE, onCardDistributed)
    await consumer.subscribe(BATTLES_QUEUE, onBattleFinished)

    app.addHook('onClose', async () => {
      await consumer.disconnect()
    })
  })
}
