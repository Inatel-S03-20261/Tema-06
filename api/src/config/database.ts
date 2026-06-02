import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
// TODO import * as schema from '../db/schema.js'

const client = postgres(process.env.DATABASE_URL!)

//TODO export const db = drizzle(client, { schema })