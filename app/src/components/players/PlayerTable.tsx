import { Ban, Crown, Eye } from "lucide-react";

import Badge from "../ui/Badge";
import Button from "../ui/Button";
import DataTable from "../ui/DataTable";
import Tooltip from "../ui/Tooltip";
import type { Player } from "../../types/Player";
import type { BadgeTone } from "../ui/Badge";

type StatusFiltro =
    | "Todos"
    | "Ativos"
    | "Admins"
    | "Banidos";

type PlayerTableProps = {
    players: Player[];
    filter: string;
    statusFiltro: StatusFiltro;
    selectedPlayerId?: string;
    hasActiveFilters: boolean;
    onFilterChange: (value: string) => void;
    onStatusFilterChange: (
        value: StatusFiltro,
    ) => void;
    onClearFilters: () => void;
    onSelectPlayer: (id: string) => void;
    onToggleBan: (id: string) => void;
    onToggleLevel: (id: string) => void;
};

type PlayerRowProps = {
    player: Player;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onToggleBan: (id: string) => void;
    onToggleLevel: (id: string) => void;
};

const getPlayerEmail = (player: Player) =>
    `${player.nome.toLowerCase()}${player.id}@email.com`;

const getLevelBadge = (level: Player["nivel"]) => {
    const tone: BadgeTone = level === "Administrador" ? "yellow" : "green";
    const label = level === "Administrador" ? "Admin" : "Usuário";

    return { tone, label };
};

const getStatusBadge = (isBanned: boolean) => {
    const tone: BadgeTone = isBanned ? "red" : "green";
    const label = isBanned ? "Banido" : "Ativo";

    return { tone, label };
};

const PlayerRow = ({
    player,
    isSelected,
    onSelect,
    onToggleBan,
    onToggleLevel,
}: PlayerRowProps) => {
    const email = getPlayerEmail(player);
    const levelBadge = getLevelBadge(player.nivel);
    const statusBadge = getStatusBadge(player.statusBanimento);
    const rowClassName =
        `grid gap-3 border-b border-gray-100 px-4 py-3 transition last:border-b-0 md:grid-cols-[minmax(0,1fr)_5rem_7rem_10rem] md:items-center md:gap-0 ${
            isSelected ? "bg-red-50" : "bg-white hover:bg-gray-50"
        }`.trim();

    return (
        <article className={rowClassName}>
            <button
                type="button"
                onClick={() => onSelect(player.id)}
                className="flex min-w-0 flex-1 items-center gap-3 text-left"
            >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm font-bold text-indigo-500">
                    {player.nome.charAt(0)}
                </span>

                <span className="min-w-0">
                    <strong className="block truncate text-sm font-bold text-gray-900">
                        {player.nome}
                    </strong>
                    <span className="block truncate text-xs text-gray-400">
                        {email}
                    </span>
                </span>
            </button>

            <div className="flex justify-start md:justify-center">
                <Badge tone={levelBadge.tone}>{levelBadge.label}</Badge>
            </div>

            <div className="flex justify-start md:justify-center">
                <Badge tone={statusBadge.tone}>{statusBadge.label}</Badge>
            </div>

            <div className="flex flex-nowrap gap-2 md:justify-center">
                <Tooltip content="Visualizar jogador">
                    <Button
                        type="button"
                        variant={isSelected ? "primary" : "icon"}
                        onClick={() => onSelect(player.id)}
                        aria-label="Visualizar jogador"
                        className="h-9 w-9 p-0"
                    >
                        <Eye size={16} />
                    </Button>
                </Tooltip>
                <Tooltip content="Alterar tipo do jogador">
                    <Button
                        type="button"
                        variant="icon"
                        onClick={() => onToggleLevel(player.id)}
                        aria-label="Alterar tipo do jogador"
                        className="h-9 w-9 p-0"
                    >
                        <Crown size={16} />
                    </Button>
                </Tooltip>
                <Tooltip
                    content={
                        player.statusBanimento
                            ? "Ativar jogador"
                            : "Banir jogador"
                    }
                >
                    <Button
                        type="button"
                        variant="icon"
                        onClick={() => onToggleBan(player.id)}
                        aria-label={
                            player.statusBanimento
                                ? "Ativar jogador"
                                : "Banir jogador"
                        }
                        className="h-9 w-9 p-0"
                    >
                        <Ban size={16} />
                    </Button>
                </Tooltip>
            </div>
        </article>
    );
};

const PlayerTable = ({
    players,
    filter,
    statusFiltro,
    selectedPlayerId,
    hasActiveFilters,
    onFilterChange,
    onStatusFilterChange,
    onClearFilters,
    onSelectPlayer,
    onToggleBan,
    onToggleLevel,
}: PlayerTableProps) => {
    return (
        <DataTable
            title="Lista de Jogadores"
            countLabel={`${players.length.toLocaleString("pt-BR")} jogadores`}
            columns={[
                "Jogador",
                <span className="text-center">Tipo</span>,
                <span className="text-center">Status</span>,
                <span className="text-center">Ações</span>,
            ]}
            gridClassName="grid grid-cols-[minmax(0,1fr)_8rem_8rem_12rem] items-center gap-0"
            filters={
                <>
                    <SearchInput
                        label="Jogador"
                        value={filter}
                        onChange={onFilterChange}
                        placeholder="Pesquisar jogador..."
                    />
                    <select
                        value={statusFiltro}
                        onChange={(e) =>
                            onStatusFilterChange(
                                e.target.value as StatusFiltro,
                            )
                        }
                        className="rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                        <option value="Todos">Todos</option>
                        <option value="Ativos">Ativos</option>
                        <option value="Admins">Admins</option>
                        <option value="Banidos">Banidos</option>
                    </select>
                    <ClearFiltersButton
                        onClick={onClearFilters}
                        disabled={!hasActiveFilters}
                    />
                </>
            }
        >
            {players.map((player) => (
                <PlayerRow
                    key={player.id}
                    player={player}
                    isSelected={player.id === selectedPlayerId}
                    onSelect={onSelectPlayer}
                    onToggleBan={onToggleBan}
                    onToggleLevel={onToggleLevel}
                />
            ))}
            {players.length === 0 && (
                <p className="px-4 py-4 text-sm text-gray-500">
                    Nenhum jogador encontrado.
                </p>
            )}
        </DataTable>
    );
};

export default PlayerTable;
