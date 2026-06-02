import * as playersRepository from './players.repository.js'
import type { PlayerLevel } from './players.schema.js'

export async function list(name?: string) {
  // TODO
}

export async function findById(id: string) {
  // TODO
}

export async function updateBan(id: string, isBanned: boolean) {
  // TODO
}

export async function updateLevel(id: string, level: PlayerLevel) {
  // TODO
}
