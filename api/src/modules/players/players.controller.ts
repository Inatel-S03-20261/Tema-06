import { FastifyReply, FastifyRequest } from "fastify";
import { IPlayerService, IPlayersController } from "./players.interface";
import { playersService } from "./players.service";
import { Player, PlayerParams, UpdateBanBody } from "./players.schema";

class PlayersController implements IPlayersController {
  constructor(private service: IPlayerService) {}

  async findAll(req: FastifyRequest, reply: FastifyReply): Promise<void> {
  }

  async findById(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void> {
  }

  async banById(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateBanBody }>, reply: FastifyReply): Promise<void> {
  }

  async create(req: FastifyRequest<{ Body: Player }>, reply: FastifyReply): Promise<void> {
  }

  async update(req: FastifyRequest<{ Params: PlayerParams; Body: Player }>, reply: FastifyReply): Promise<void> {
  }

  async delete(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void> {
  }
}

export const playersController = new PlayersController(playersService);
