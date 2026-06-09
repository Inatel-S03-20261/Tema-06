import type { FastifyRequest, FastifyReply } from 'fastify'
import type { Card, CardParams, ListCardsQuery } from './cards.schema.js'

export interface ICardsRepository {
  findAll(name?: string, type?: string): Promise<Card[]>
  findById(id: string): Promise<Card>
}

export interface ICardsService {
  list(name?: string, type?: string): Promise<Card[]>
  findById(id: string): Promise<Card>
}

export interface ICardsController {
  list(req: FastifyRequest<{ Querystring: ListCardsQuery }>, reply: FastifyReply): Promise<void>
  findById(req: FastifyRequest<{ Params: CardParams }>, reply: FastifyReply): Promise<void>
}

export interface ICardsAdapter {
  fetchAll(name?: string, type?: string): Promise<unknown[]>
  fetchById(id: string): Promise<unknown>
}

export interface ICardsMapper {
  toInternal(raw: unknown): Card
  toResponse(card: Card): Card
}
