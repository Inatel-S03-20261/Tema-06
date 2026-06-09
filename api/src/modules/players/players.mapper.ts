import { IPlayersMapper } from "./players.interface";
import { Player, PlayerLevel, RawPlayer } from "./players.schema";

class PlayersMapper implements IPlayersMapper {
  toInternal(raw: unknown): Player {
    const r = raw as RawPlayer;
    const nivel: PlayerLevel =
      r.level === "admin" ? "Administrador" : "Usuário";

    return {
      id: r.id,
      nome: r.name,
      nivel,
      statusBanimento: r.isBanned,
    };
  }

  toResponse(player: Player): Player {
    return player;
  }
}

export const playersMapper = new PlayersMapper();
