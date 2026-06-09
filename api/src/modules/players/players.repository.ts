import type { IPlayerRepository, IPlayersAdapter, IPlayersMapper } from "./players.interface";
import { playersAdapter } from "./players.adapter";
import { playersMapper } from "./players.mapper";
import type { Player } from "./players.schema";

class PlayersRepository implements IPlayerRepository {
  constructor(
    private adapter: IPlayersAdapter,
    private mapper: IPlayersMapper,
  ) {}

  async findAll(name?: string): Promise<Player[]> {
    const raw = await this.adapter.fetchAll(name);
    return raw.map(r => this.mapper.toInternal(r));
  }

  async findById(id: string): Promise<Player> {
    const raw = await this.adapter.fetchById(id);
    return this.mapper.toInternal(raw);
  }

  async create(player: Player): Promise<Player> {
    const raw = await this.adapter.create(player);
    return this.mapper.toInternal(raw);
  }

  async update(id: string, player: Player): Promise<Player> {
    const raw = await this.adapter.update(id, player);
    return this.mapper.toInternal(raw);
  }

  async delete(id: string): Promise<boolean> {
    await this.adapter.delete(id);
    return true;
  }
}

export const playersRepository = new PlayersRepository(playersAdapter, playersMapper);
