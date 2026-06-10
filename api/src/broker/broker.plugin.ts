import fp from 'fastify-plugin'
import type { IBrokerConsumer } from './broker.interface.js'
import { CARDS_QUEUE, onCardDistributed } from './messages/cards.message.js'
import { BATTLES_QUEUE, onBattleFinished } from './messages/battles.message.js'
import { buildChain, parseJsonLink, logLink } from './message.chain.js'

// injeta o consumer
export function createBrokerPlugin(consumer: IBrokerConsumer) {
  return fp(async (app) => {
    await consumer.connect()

    // cada subscribe usa a cadeia: parseJson -> log -> handler especifico
    await consumer.subscribe(CARDS_QUEUE, buildChain(
      parseJsonLink,
      logLink,
      async (ctx, next) => { await onCardDistributed(ctx.parsed); await next() },
    ))

    await consumer.subscribe(BATTLES_QUEUE, buildChain(
      parseJsonLink,
      logLink,
      async (ctx, next) => { await onBattleFinished(ctx.parsed); await next() },
    ))

    app.addHook('onClose', async () => {
      await consumer.disconnect()
    })
  })
}
