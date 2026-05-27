import { IPlayersMapper } from "./players.interface";
import { Player } from "./players.schema";

class PlayersMapper implements IPlayersMapper {
  toInternal(raw: unknown): Player {
    return {} as Player;
  }

  toResponse(player: Player): Player {
    return player;
  }
}

export const playersMapper = new PlayersMapper();
