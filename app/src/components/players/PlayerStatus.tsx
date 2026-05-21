type PlayerStatusProps = {
    isBanned: boolean;
};

const PlayerStatus = ({ isBanned }: PlayerStatusProps) => {
    return <span>{isBanned ? "Banido" : "Ativo"}</span>;
};

export default PlayerStatus;
