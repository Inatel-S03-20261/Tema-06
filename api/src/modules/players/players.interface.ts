import { FastifyReply, FastifyRequest } from "fastify";
import { Player, PlayerParams, UpdateBanBody } from "./players.schema"

export interface IPlayerRepository {
  findAll(name?: string): Promise<Player[]>;
  findById(id: string): Promise<Player>;
  create(player: Player): Promise<Player>;
  update(id: string, player: Player): Promise<Player>;
  delete(id: string): Promise<boolean>;
}

export interface IPlayerService {
  findAll(name?: string): Promise<Player[]>;
  findById(id: string): Promise<Player>;
  create(player: Player): Promise<Player>;
  update(id: string, player: Player): Promise<Player>;
  delete(id: string): Promise<boolean>;
}

export interface IPlayersController {
  findAll(req: FastifyRequest, reply: FastifyReply): Promise<void>;
  findById(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void>;
  banById(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateBanBody }>, reply: FastifyReply): Promise<void>;
  create(req: FastifyRequest<{ Body: Player }>, reply: FastifyReply): Promise<void>;
  update(req: FastifyRequest<{ Params: PlayerParams; Body: Player }>, reply: FastifyReply): Promise<void>;
  delete(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply): Promise<void>;
}

export interface IPlayersAdapter {
  fetchAll(name?: string): Promise<unknown[]>;
  fetchById(id: string): Promise<unknown>;
  create(player: Player): Promise<unknown>;
  update(id: string, player: Player): Promise<unknown>;
  delete(id: string): Promise<void>;
}

export interface IPlayersMapper {
  toInternal(raw: unknown): Player;
  toResponse(player: Player): Player;
}