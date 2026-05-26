import { pgTable, text, boolean, uuid, integer, timestamp } from 'drizzle-orm/pg-core'

export const players = pgTable('players', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  level: text('level').$type<'user' | 'admin'>().notNull().default('user'),
  isBanned: boolean('is_banned').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const cards = pgTable('cards', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  rarity: text('rarity').$type<'common' | 'rare' | 'epic' | 'legendary'>().notNull(),
  type: text('type').notNull(),
  attack: integer('attack').notNull(),
  defense: integer('defense').notNull(),
})

export const playerCards = pgTable('player_cards', {
  playerId: uuid('player_id')
    .notNull()
    .references(() => players.id, { onDelete: 'cascade' }),
  cardId: uuid('card_id')
    .notNull()
    .references(() => cards.id, { onDelete: 'cascade' }),
})

export const trades = pgTable('trades', {
  id: uuid('id').primaryKey().defaultRandom(),
  sourcePlayerId: uuid('source_player_id')
    .notNull()
    .references(() => players.id),
  targetPlayerId: uuid('target_player_id').references(() => players.id),
  status: text('status')
    .$type<'open' | 'proposed' | 'completed'>()
    .notNull()
    .default('open'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

export const tradeCards = pgTable('trade_cards', {
  tradeId: uuid('trade_id')
    .notNull()
    .references(() => trades.id, { onDelete: 'cascade' }),
  cardId: uuid('card_id')
    .notNull()
    .references(() => cards.id),
})
