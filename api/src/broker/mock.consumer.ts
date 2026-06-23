import type { IBrokerConsumer, MessageHandler } from './broker.interface.js'

// Consumer mockado: não conecta a nenhum broker real (RabbitMQ).
// Usado quando BROKER_URL não está definido, para a API rodar 100% com mocks.
// Guarda os handlers e expõe `emit` caso queira disparar mensagens manualmente.
export class MockBrokerConsumer implements IBrokerConsumer {
  private handlers = new Map<string, MessageHandler>()

  async connect(): Promise<void> {
    console.log('[broker] usando consumer mockado (sem RabbitMQ)')
  }

  async disconnect(): Promise<void> {}

  async subscribe(queue: string, handler: MessageHandler): Promise<void> {
    this.handlers.set(queue, handler)
    console.log(`[broker] (mock) inscrito na fila=${queue}`)
  }

  // Dispara uma mensagem na fila para testar a cadeia de processamento localmente.
  async emit(queue: string, payload: unknown): Promise<void> {
    const handler = this.handlers.get(queue)
    if (!handler) return
    await handler({ raw: JSON.stringify(payload), queue })
  }
}
