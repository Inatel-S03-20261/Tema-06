import type { IPlayerRepository, IPlayerService } from "./players.interface";
import { playersRepository } from "./players.repository";
import type { Player } from "./players.schema";

class PlayersService implements IPlayerService {
  constructor(private repo: IPlayerRepository) {}

  async findAll(name?: string): Promise<Player[]> {
    return this.repo.findAll(name);
  }

  async findById(id: string): Promise<Player> {
    return this.repo.findById(id);
  }

  async create(player: Player): Promise<Player> {
    return this.repo.create(player);
  }

  async update(id: string, player: Player): Promise<Player> {
    return this.repo.update(id, player);
  }

  async delete(id: string): Promise<boolean> {
    return this.repo.delete(id);
  }
}

export const playersService = new PlayersService(playersRepository);
