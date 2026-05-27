import { IPlayersAdapter } from "./players.interface";
import { Player } from "./players.schema";

class PlayersAdapter implements IPlayersAdapter {
  async fetchAll(name?: string): Promise<unknown[]> {
    return [];
  }

  async fetchById(id: string): Promise<unknown> {
    return {};
  }

  async create(player: Player): Promise<unknown> {
    return {};
  }

  async update(id: string, player: Player): Promise<unknown> {
    return {};
  }

  async delete(id: string): Promise<void> {
  }
}

export const playersAdapter = new PlayersAdapter();
