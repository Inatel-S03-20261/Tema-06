import Fastify from 'fastify'
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod'
import { registerPlugins } from './plugins/index.js'
import { playersRoutes } from './modules/players/players.routes.js'
import { cardsRoutes } from './modules/cards/cards.routes.js'
import { tradesRoutes } from './modules/trades/trades.routes.js'

const app = Fastify({ logger: true }).withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await registerPlugins(app)

await app.register(playersRoutes, { prefix: '/players' })
await app.register(cardsRoutes,   { prefix: '/cards' })
await app.register(tradesRoutes,  { prefix: '/trades' })
// TODO: await app.register(authRoutes, { prefix: '/auth' })

const port = Number(process.env.PORT) || 3000
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'

await app.listen({ port, host })
