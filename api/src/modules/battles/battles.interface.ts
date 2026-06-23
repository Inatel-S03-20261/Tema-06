import type { FastifyRequest, FastifyReply } from 'fastify'
import type { Battle, BattleStatus, BattleParams, ListBattlesQuery } from './battles.schema.js'

export interface IBattlesRepository {
  findAll(status?: BattleStatus, playerId?: string): Promise<Battle[]>
  findById(id: string): Promise<Battle>
}

export interface IBattlesService {
  findAll(status?: BattleStatus, playerId?: string): Promise<Battle[]>
  findById(id: string): Promise<Battle>
}

export interface IBattlesController {
  findAll(req: FastifyRequest<{ Querystring: ListBattlesQuery }>, reply: FastifyReply): Promise<void>
  findById(req: FastifyRequest<{ Params: BattleParams }>, reply: FastifyReply): Promise<void>
}

export interface IBattlesAdapter {
  fetchAll(status?: BattleStatus, playerId?: string): Promise<unknown[]>
  fetchById(id: string): Promise<unknown>
}

export interface IBattlesMapper {
  toInternal(raw: unknown): Battle
  toResponse(battle: Battle): Battle
}
