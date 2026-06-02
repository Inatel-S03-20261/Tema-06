import type { Player } from "../../types/Player";
import PlayerCard from "./PlayerCard";

type PlayerListProps = {
    players: Player[];
    onToggleBan: (id: string) => void;
    onToggleLevel: (id: string) => void;
};

const PlayerList = ({
    players,
    onToggleBan,
    onToggleLevel,
}: PlayerListProps) => {
    if (players.length === 0) {
        return <p>Nenhum jogador encontrado.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {players.map((player) => (
                <PlayerCard
                    key={player.id}
                    player={player}
                    onToggleBan={onToggleBan}
                    onToggleLevel={onToggleLevel}
                />
            ))}
        </div>
    );
};

export default PlayerList;
