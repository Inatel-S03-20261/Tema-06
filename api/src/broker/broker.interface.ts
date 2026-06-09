export interface IBrokerConsumer {
  connect(): Promise<void>
  disconnect(): Promise<void>
  subscribe(queue: string, handler: (msg: unknown) => Promise<void>): Promise<void>
}
