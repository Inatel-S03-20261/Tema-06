import type { PlayerLevel as PlayerLevelType } from "../../types/Player";

type PlayerLevelProps = {
    level: PlayerLevelType;
};

const PlayerLevel = ({ level }: PlayerLevelProps) => {
    return <span>{level}</span>;
};

export default PlayerLevel;
