import type { IPlayerRepository, IPlayerService } from "./players.interface";
import { playersRepository } from "./players.repository";
import type { Player } from "./players.schema";
import { TtlCache } from "../../shared/cache";

class PlayersService implements IPlayerService {
  private cache = new TtlCache<Player[] | Player>();

  constructor(private repo: IPlayerRepository) {}

  async findAll(name?: string): Promise<Player[]> {
    const key = `findAll:${name ?? ""}`;
    const cached = this.cache.get(key) as Player[] | undefined;
    if (cached) return cached;

    const players = await this.repo.findAll(name);
    this.cache.set(key, players);
    return players;
  }

  async findById(id: string): Promise<Player> {
    const key = `findById:${id}`;
    const cached = this.cache.get(key) as Player | undefined;
    if (cached) return cached;

    const player = await this.repo.findById(id);
    this.cache.set(key, player);
    return player;
  }

  async create(player: Player): Promise<Player> {
    const created = await this.repo.create(player);
    this.cache.clear();
    return created;
  }

  async update(id: string, player: Player): Promise<Player> {
    const updated = await this.repo.update(id, player);
    this.cache.clear();
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repo.delete(id);
    this.cache.clear();
    return result;
  }
}

export const playersService = new PlayersService(playersRepository);
