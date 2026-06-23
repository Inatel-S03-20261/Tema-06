import type { FastifyReply, FastifyRequest } from 'fastify'
import type { IBattlesController, IBattlesService } from './battles.interface.js'
import { battlesService } from './battles.service.js'
import type { BattleParams, ListBattlesQuery } from './battles.schema.js'

class BattlesController implements IBattlesController {
  constructor(private service: IBattlesService) {}

  async findAll(req: FastifyRequest<{ Querystring: ListBattlesQuery }>, reply: FastifyReply): Promise<void> {
    const { status, jogadorId } = req.query
    const battles = await this.service.findAll(status, jogadorId)
    reply.send(battles)
  }

  async findById(req: FastifyRequest<{ Params: BattleParams }>, reply: FastifyReply): Promise<void> {
    const battle = await this.service.findById(req.params.id)
    reply.send(battle)
  }
}

export const battlesController = new BattlesController(battlesService)
