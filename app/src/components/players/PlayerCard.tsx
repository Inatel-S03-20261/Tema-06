import ActionLink from "../ActionLink";
import Button from "../Button";
import type { Player } from "../../types/Player";
import PlayerLevel from "./PlayerLevel";
import PlayerStatus from "./PlayerStatus";

type PlayerCardProps = {
    player: Player;
    onToggleBan: (id: string) => void;
    onToggleLevel: (id: string) => void;
};

const PlayerCard = ({
    player,
    onToggleBan,
    onToggleLevel,
}: PlayerCardProps) => {
    return (
        <article className="border border-gray-300 rounded p-4 flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{player.nome}</h2>

            <p>
                Tipo: <PlayerLevel level={player.nivel} />
            </p>

            <p>
                Status: <PlayerStatus isBanned={player.statusBanimento} />
            </p>

            <div className="flex flex-wrap gap-2">
                <ActionLink to={`/jogadores/${player.id}`}>
                    Detalhes
                </ActionLink>
                <Button onClick={() => onToggleBan(player.id)}>
                    {player.statusBanimento ? "Desbanir" : "Banir"}
                </Button>
                <Button onClick={() => onToggleLevel(player.id)}>
                    {player.nivel === "Administrador"
                        ? "Remover admin"
                        : "Tornar admin"}
                </Button>
            </div>
        </article>
    );
};

export default PlayerCard;
