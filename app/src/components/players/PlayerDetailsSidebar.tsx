import { useState } from "react";

import Badge from "../ui/Badge";
import BattleTable from "../battles/BattleTable";
import Button from "../ui/Button";
import CardTable from "../cards/CardTable";
import PanelCard from "../ui/PanelCard";
import TradeTable from "../trades/TradeTable";
import { buscarBatalhasPorJogador } from "../../services/battleService";
import { buscarCartasPorJogador } from "../../services/playerService";
import { buscarTrocasPorJogador } from "../../services/tradeService";
import type { Player } from "../../types/Player";
import type { BadgeTone } from "../ui/Badge";

type PlayerDetailsSidebarProps = {
    player?: Player;
    onClose: () => void;
    className?: string;
};

type PlayerDetailsTab = "Perfil" | "Batalhas" | "Trocas" | "Cartas";

const tabs: PlayerDetailsTab[] = ["Perfil", "Batalhas", "Trocas", "Cartas"];

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

const PlayerDetailsSidebar = ({
    player,
    onClose,
    className = "",
}: PlayerDetailsSidebarProps) => {
    const [activeTab, setActiveTab] = useState<PlayerDetailsTab>("Perfil");

    if (!player) {
        return (
            <PanelCard className={`h-full ${className}`.trim()}>
                <p className="text-sm text-gray-500">
                    Selecione um jogador para visualizar os detalhes.
                </p>
            </PanelCard>
        );
    }

    const cards = buscarCartasPorJogador(player.id);
    const trades = buscarTrocasPorJogador(player.id);
    const battles = buscarBatalhasPorJogador(player.id);
    const levelBadge = getLevelBadge(player.nivel);
    const statusBadge = getStatusBadge(player.statusBanimento);

    return (
        <aside
            className={`flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-lg ${className}`.trim()}
        >
            <header className="flex items-start gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-500">
                    {player.nome.charAt(0)}
                </span>

                <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold tracking-[0.2em] text-gray-500">
                        Perfil do Jogador
                    </p>
                    <h2 className="mt-2 text-lg font-bold text-gray-900">
                        {player.nome}
                    </h2>
                    <p className="truncate text-sm text-gray-400">
                        {getPlayerEmail(player)}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                        <Badge tone={statusBadge.tone}>
                            {statusBadge.label}
                        </Badge>
                        <Badge tone={levelBadge.tone}>{levelBadge.label}</Badge>
                    </div>
                </div>

                <Button
                    type="button"
                    variant="icon"
                    onClick={onClose}
                    aria-label="Fechar detalhes"
                    className="h-8 w-8 p-0"
                >
                    X
                </Button>
            </header>

            <nav className="mt-6 grid grid-cols-4 border-b border-gray-200 text-sm font-semibold text-gray-400">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        type="button"
                        onClick={() => setActiveTab(tab)}
                        className={`border-b-2 px-2 py-3 transition ${
                            activeTab === tab
                                ? "border-red-400 text-red-500"
                                : "border-transparent hover:text-gray-600"
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </nav>

            <div className="mt-5 min-h-0 flex-1 overflow-y-auto pr-1">
                {activeTab === "Perfil" && (
                    <div className="grid gap-3 sm:grid-cols-2">
                        <PanelCard className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                ID
                            </span>
                            <strong className="text-gray-900">{player.id}</strong>
                        </PanelCard>
                        <PanelCard className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Cartas
                            </span>
                            <strong className="text-gray-900">
                                {cards.length}
                            </strong>
                        </PanelCard>
                        <PanelCard className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Batalhas
                            </span>
                            <strong className="text-gray-900">
                                {battles.length}
                            </strong>
                        </PanelCard>
                        <PanelCard className="flex flex-col gap-1">
                            <span className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                                Trocas
                            </span>
                            <strong className="text-gray-900">
                                {trades.length}
                            </strong>
                        </PanelCard>
                    </div>
                )}

                {activeTab === "Batalhas" && <BattleTable battles={battles} />}
                {activeTab === "Trocas" && <TradeTable trades={trades} />}
                {activeTab === "Cartas" && <CardTable cards={cards} />}
            </div>
        </aside>
    );
};

export default PlayerDetailsSidebar;
