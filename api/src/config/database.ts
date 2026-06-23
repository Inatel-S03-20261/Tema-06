// Banco mockado em memória (sem Postgres). Enquanto a API roda apenas com mocks,
// `db` é o store definido em ../db/mock.ts. Para voltar ao Postgres real, troque
// este re-export pela conexão Drizzle comentada abaixo.
export { db } from '../db/mock.js'

// import postgres from 'postgres'
// import { drizzle } from 'drizzle-orm/postgres-js'
// import * as schema from '../db/schema.js'
// const client = postgres(process.env.DATABASE_URL!)
// export const db = drizzle(client, { schema })
