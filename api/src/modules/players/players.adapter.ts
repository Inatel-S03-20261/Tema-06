import type { IPlayersAdapter } from "./players.interface";
import type { Player, RawPlayer } from "./players.schema";

const rawPlayers: RawPlayer[] = [
  { id: "1", name: "João", level: "user", isBanned: false },
  { id: "2", name: "Maria", level: "admin", isBanned: false },
  { id: "3", name: "Carlos", level: "user", isBanned: true },
];

class PlayersAdapter implements IPlayersAdapter {
  async fetchAll(name?: string): Promise<unknown[]> {
    if (!name) return rawPlayers;

    const termo = name.toLowerCase();
    return rawPlayers.filter((p) => p.name.toLowerCase().includes(termo));
  }

  async fetchById(id: string): Promise<unknown> {
    const found = rawPlayers.find((p) => p.id === id);
    if (!found) throw new Error(`Jogador ${id} não encontrado`);
    return found;
  }

  async create(player: Player): Promise<unknown> {
    return {
      id: player.id,
      name: player.nome,
      level: player.nivel === "Administrador" ? "admin" : "user",
      isBanned: player.statusBanimento,
    };
  }

  async update(id: string, player: Player): Promise<unknown> {
    return {
      id,
      name: player.nome,
      level: player.nivel === "Administrador" ? "admin" : "user",
      isBanned: player.statusBanimento,
    };
  }

  async delete(id: string): Promise<void> {
  }
}

export const playersAdapter = new PlayersAdapter();
