import type { FastifyRequest, FastifyReply } from 'fastify'
import { ListQuery, PlayerParams, UpdateBanBody, UpdateLevelBody } from './players.schema';


export async function list(req: FastifyRequest<{ Querystring: ListQuery }>, reply: FastifyReply) {
  // TODO
}

export async function findById(req: FastifyRequest<{ Params: PlayerParams }>, reply: FastifyReply) {
  // TODO
}

export async function updateBan(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateBanBody }>, reply: FastifyReply) {
  // TODO
}

export async function updateLevel(req: FastifyRequest<{ Params: PlayerParams; Body: UpdateLevelBody }>, reply: FastifyReply) {
  // TODO
}
