// Chain of Responsibility — cada link processa o contexto e decide se passa adiante

export type MessageContext = {
  raw: string
  parsed?: unknown
  queue: string
}

type Next = () => Promise<void>
export type ChainLink = (ctx: MessageContext, next: Next) => Promise<void>

export function buildChain(...links: ChainLink[]) {
  return async (ctx: MessageContext): Promise<void> => {
    const run = async (index: number): Promise<void> => {
      if (index >= links.length) return
      await links[index](ctx, () => run(index + 1))
    }
    await run(0)
  }
}

// link 1: valida json e popula ctx.parsed — para a cadeia se falhar
export const parseJsonLink: ChainLink = async (ctx, next) => {
  try {
    ctx.parsed = JSON.parse(ctx.raw)
    await next()
  } catch {
    console.error(`[broker] invalid json on queue=${ctx.queue}, dropping`)
  }
}

// link 2: loga a mensagem antes de passar adiante
export const logLink: ChainLink = async (ctx, next) => {
  console.log(`[broker] queue=${ctx.queue} msg=${ctx.raw.slice(0, 100)}`)
  await next()
}
