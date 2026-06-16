import amqp from 'amqplib'
import type { IBrokerConsumer, MessageHandler } from './broker.interface.js'
import type { MessageContext } from './message.chain.js'

export class RabbitMQConsumer implements IBrokerConsumer {
  private connection: amqp.Connection | null = null
  private channel: amqp.Channel | null = null

  async connect(): Promise<void> {
    this.connection = await amqp.connect(process.env.BROKER_URL ?? 'amqp://localhost')
    this.channel = await this.connection.createChannel()
  }

  async disconnect(): Promise<void> {
    await this.channel?.close()
    await this.connection?.close()
  }

  async subscribe(queue: string, handler: MessageHandler): Promise<void> {
    if (!this.channel) throw new Error('broker not connected')

    await this.channel.assertQueue(queue, { durable: true })

    this.channel.consume(queue, async (msg) => {
      if (!msg) return

      const ctx: MessageContext = { raw: msg.content.toString(), queue }

      try {
        await handler(ctx)
        this.channel!.ack(msg)
      } catch (err) {
        console.error(`[rabbitmq] handler error on queue=${queue}`, err)
        // nack sem requeue para nao travar a fila
        this.channel!.nack(msg, false, false)
      }
    })
  }
}
