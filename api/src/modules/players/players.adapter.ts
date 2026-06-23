import type { IPlayersAdapter } from "./players.interface";
import type { Player } from "./players.schema";
import { db } from "../../config/database.js";

class PlayersAdapter implements IPlayersAdapter {
  async fetchAll(name?: string): Promise<unknown[]> {
    if (!name) return db.players;

    const termo = name.toLowerCase();
    return db.players.filter((p) => p.name.toLowerCase().includes(termo));
  }

  async fetchById(id: string): Promise<unknown> {
    const found = db.players.find((p) => p.id === id);
    if (!found) throw new Error(`Jogador ${id} não encontrado`);
    return found;
  }

  async fetchCardIds(id: string): Promise<string[]> {
    return db.playerCards
      .filter((pc) => pc.playerId === id)
      .map((pc) => pc.cardId);
  }

  async create(player: Player): Promise<unknown> {
    const raw = {
      id: player.id,
      name: player.nome,
      level: player.nivel === "Administrador" ? "admin" : "user",
      isBanned: player.statusBanimento,
      isActive: player.ativo,
      createdAt: new Date().toISOString(),
    } as const;

    db.players.push({ ...raw });
    return raw;
  }

  async update(id: string, player: Player): Promise<unknown> {
    const existente = db.players.find((p) => p.id === id);

    const raw = {
      id,
      name: player.nome,
      level: (player.nivel === "Administrador" ? "admin" : "user") as
        | "admin"
        | "user",
      isBanned: player.statusBanimento,
      isActive: player.ativo,
      createdAt: existente?.createdAt ?? new Date().toISOString(),
    };

    const index = db.players.findIndex((p) => p.id === id);
    if (index >= 0) db.players[index] = raw;

    return raw;
  }

  async delete(id: string): Promise<void> {
    const index = db.players.findIndex((p) => p.id === id);
    if (index >= 0) db.players.splice(index, 1);
  }
}

export const playersAdapter = new PlayersAdapter();
