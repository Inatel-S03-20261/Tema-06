import type { MessageContext } from './message.chain.js'

export type MessageHandler = (ctx: MessageContext) => Promise<void>

export interface IBrokerConsumer {
  connect(): Promise<void>
  disconnect(): Promise<void>
  subscribe(queue: string, handler: MessageHandler): Promise<void>
}
