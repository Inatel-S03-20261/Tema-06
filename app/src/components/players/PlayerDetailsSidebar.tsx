import { useEffect, useState } from "react";

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
import type { Card } from "../../types/Card";
import type { Trade } from "../../types/Trade";
import type { Battle } from "../../types/Battle";
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
    const [cards, setCards] = useState<Card[]>([]);
    const [trades, setTrades] = useState<Trade[]>([]);
    const [battles, setBattles] = useState<Battle[]>([]);

    const playerId = player?.id;

    useEffect(() => {
        if (!playerId) return;

        buscarCartasPorJogador(playerId)
            .then(setCards)
            .catch((erro) => console.error("Erro ao carregar cartas", erro));
        buscarTrocasPorJogador(playerId)
            .then(setTrades)
            .catch((erro) => console.error("Erro ao carregar trocas", erro));
        buscarBatalhasPorJogador(playerId)
            .then(setBattles)
            .catch((erro) => console.error("Erro ao carregar batalhas", erro));
    }, [playerId]);

    if (!player) {
        return (
            <PanelCard className={`h-full ${className}`.trim()}>
                <p className="text-sm text-gray-500">
                    Selecione um jogador para visualizar os detalhes.
                </p>
            </PanelCard>
        );
    }

    const levelBadge = getLevelBadge(player.nivel);
    const statusBadge = getStatusBadge(player.statusBanimento);

    return (
        <aside
            className={`flex h-full  w-full min-h-[calc(100vh-13rem)] flex-col overflow-hidden bg-white px-8 py-8 ${className}`.trim()}
        >
            <header>
                <div className="flex items-center justify-between">
                    <p className="text-base font-semibold tracking-[0.22em] text-gray-500">
                        Perfil do Jogador
                    </p>

                    <Button
                        type="button"
                        variant="icon"
                        onClick={onClose}
                        aria-label="Fechar detalhes"
                        className="h-8 w-8 p-0"
                    >
                        X
                    </Button>
                </div>

                <div className="mt-7 flex items-start gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-lg font-bold text-indigo-500">
                        {player.nome.charAt(0)}
                    </span>

                    <div className="min-w-0">
                        <h2 className="text-sm font-bold tracking-[0.18em] text-gray-900">
                            {player.nome}
                        </h2>

                        <p className="mt-2 truncate text-xs font-semibold tracking-[0.16em] text-gray-300">
                            {getPlayerEmail(player)}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            <Badge tone={levelBadge.tone}>
                                {levelBadge.label}
                            </Badge>

                            <Badge tone={statusBadge.tone}>
                                {statusBadge.label}
                            </Badge>
                        </div>
                    </div>
                </div>
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
                    <div className="grid gap-4 sm:grid-cols-2">
                    <PanelCard className="flex min-h-24 flex-col justify-center gap-2 rounded-lg border-none bg-gray-50 shadow-none">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            ID
                        </span>

                        <strong className="text-sm font-bold text-gray-900">
                            #{player.id}
                        </strong>

                        <span className="text-xs font-semibold text-gray-400">
                            Identificador
                        </span>
                    </PanelCard>

                    <PanelCard className="flex min-h-24 flex-col justify-center gap-2 rounded-lg border-none bg-gray-50 shadow-none">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            Role
                        </span>

                        <strong className="text-sm font-bold text-gray-900">
                            {player.nivel === "Administrador" ? "ADMIN" : "USER"}
                        </strong>

                        <span className="text-xs font-semibold text-gray-400">
                            Permissão
                        </span>
                    </PanelCard>

                    <PanelCard className="flex min-h-24 flex-col justify-center gap-2 rounded-lg border-none bg-gray-50 shadow-none">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            Status
                        </span>

                        <strong
                            className={`text-sm font-bold ${
                                player.statusBanimento ? "text-red-500" : "text-green-600"
                            }`}
                        >
                            {player.statusBanimento ? "Banido" : "Ativo"}
                        </strong>

                        <span className="text-xs font-semibold text-gray-400">
                            Conta
                        </span>
                    </PanelCard>

                    <PanelCard className="flex min-h-24 flex-col justify-center gap-2 rounded-lg border-none bg-gray-50 shadow-none">
                        <span className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
                            Criado em
                        </span>

                        <strong className="text-sm font-bold text-gray-900">
                            12/05/2024
                        </strong>

                        <span className="text-xs font-semibold text-gray-400">
                            Data de Registro
                        </span>
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
