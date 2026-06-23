import type { FastifyReply, FastifyRequest } from "fastify";
import type { IPlayerService, IPlayersController } from "./players.interface";
import { playersService } from "./players.service";
import type { ListQuery, Player, PlayerParams, UpdateBanBody, UpdateLevelBody } from "./players.schema";

class PlayersController implements IPlayersController {
  constructor(private service: IPlayerService) {}

  async findAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { nome } = req.query as ListQuery;
    const players = await this.service.findAll(nome);
    reply.send(players);
  }

  async findById(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void> {
    const player = await this.service.findById(req.params.id);
    reply.send(player);
  }

  async findCards(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void> {
    const cards = await this.service.findCards(req.params.id);
    reply.send(cards);
  }

  async banById(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateBanBody }>, reply: FastifyReply): Promise<void> {
    const atual = await this.service.findById(req.params.id);
    const atualizado = await this.service.update(req.params.id, {
      ...atual,
      statusBanimento: req.body.statusBanimento,
    });
    reply.send(atualizado);
  }

  async levelById(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateLevelBody }>, reply: FastifyReply): Promise<void> {
    const atual = await this.service.findById(req.params.id);
    const atualizado = await this.service.update(req.params.id, {
      ...atual,
      nivel: req.body.nivel,
    });
    reply.send(atualizado);
  }

  async create(req: FastifyRequest<{ Body: Player }>, reply: FastifyReply): Promise<void> {
    const player = await this.service.create(req.body);
    reply.status(201).send(player);
  }

  async update(req: FastifyRequest<{ Params: PlayerParams; Body: Player }>, reply: FastifyReply): Promise<void> {
    const player = await this.service.update(req.params.id, req.body);
    reply.send(player);
  }

  async delete(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void> {
    await this.service.delete(req.params.id);
    reply.status(204).send();
  }
}

export const playersController = new PlayersController(playersService);
