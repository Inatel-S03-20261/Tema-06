import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";

import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/forms/SearchInput";
import FilterPanel from "../components/forms/FilterPanel";
import FilterChip from "../components/forms/FilterChip";
import PlayerDetailsSidebar from "../components/players/PlayerDetailsSidebar";
import PlayerTable from "../components/players/PlayerTable";
import { jogadoresMock } from "../services/playerService";
import type { Player } from "../types/Player";

const Players = () => {
    const [jogadores, setJogadores] = useState<Player[]>(jogadoresMock);
    const [filtro, setFiltro] = useState("");
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFiltro, setStatusFiltro] = useState<
        "Todos" | "Ativos" | "Admins" | "Inativos" | "Banidos"
    >("Todos");

    const jogadoresFiltrados = useMemo(
        () =>
            jogadores.filter((jogador) => {
                const correspondePesquisa = jogador.nome
                    .toLowerCase()
                    .includes(filtro.toLowerCase());

                const correspondeStatus =
                    statusFiltro === "Todos" ||
                    (statusFiltro === "Ativos" && !jogador.statusBanimento) ||
                    (statusFiltro === "Admins" &&
                        jogador.nivel === "Administrador") ||
                    (statusFiltro === "Banidos" && jogador.statusBanimento) ||
                    (statusFiltro === "Inativos" &&
                        "ativo" in jogador &&
                        jogador.ativo === false);

                return correspondePesquisa && correspondeStatus;
            }),
        [filtro, jogadores, statusFiltro],
    );
    const selectedPlayer = jogadoresFiltrados.find(
        (jogador) => jogador.id === selectedPlayerId,
    );

    useEffect(() => {
        const hasSelectedPlayer = jogadoresFiltrados.some(
            (jogador) => jogador.id === selectedPlayerId,
        );

        if (!hasSelectedPlayer) {
            setSelectedPlayerId(jogadoresFiltrados[0]?.id);
        }
    }, [jogadoresFiltrados, selectedPlayerId]);

    const voltarPagina = () => {
        window.history.back();
    };

    const selecionarJogador = (id: string) => {
        setSelectedPlayerId(id);
        setIsDetailsOpen(true);
    };

    const alterarBanimento = (id: string) => {
        const jogadoresAtualizados = jogadores.map((jogador) => {
            if (jogador.id === id) {
                return {
                    ...jogador,
                    statusBanimento: !jogador.statusBanimento,
                };
            }

            return jogador;
        });

        setJogadores(jogadoresAtualizados);
    };

    const alterarNivel = (id: string) => {
        const jogadoresAtualizados = jogadores.map((jogador) => {
            if (jogador.id === id) {
                const novoNivel: Player["nivel"] =
                    jogador.nivel === "Administrador"
                        ? "Usuário"
                        : "Administrador";

                return {
                    ...jogador,
                    nivel: novoNivel,
                };
            }

            return jogador;
        });

        setJogadores(jogadoresAtualizados);
    };

    return (
        <PageLayout
            title="Jogadores"
            subtitle="Gerenciar"
            contentClassName="relative"
            searchValue={filtro}
            searchPlaceholder="Pesquisar jogador..."
            onSearchChange={setFiltro}
            showFilterButton
            isFilterOpen={isFilterOpen}
            onToggleFilters={() => setIsFilterOpen((value) => !value)}
            filterContent={
                <FilterPanel>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Status do Jogador
                    </p>

                    <div className="flex flex-wrap gap-3">
                        {["Todos", "Ativos", "Admins", "Inativos", "Banidos"].map(
                            (status) => (
                                <FilterChip
                                    key={status}
                                    active={statusFiltro === status}
                                    onClick={() =>
                                        setStatusFiltro(
                                            status as
                                                | "Todos"
                                                | "Ativos"
                                                | "Admins"
                                                | "Inativos"
                                                | "Banidos",
                                        )
                                    }
                                >
                                    {status}
                                </FilterChip>
                            ),
                        )}
                    </div>
                </FilterPanel>
            }
        >
            <PlayerTable
                players={jogadoresFiltrados}
                selectedPlayerId={isDetailsOpen ? selectedPlayerId : undefined}
                onSelectPlayer={selecionarJogador}
                onToggleBan={alterarBanimento}
                onToggleLevel={alterarNivel}
            />

            {isDetailsOpen && (
                <div className="absolute inset-y-0 right-0 z-20 w-full max-w-[34rem]">
                    <PlayerDetailsSidebar
                        player={selectedPlayer}
                        onClose={() => setIsDetailsOpen(false)}
                    />
                </div>
            )}
        </PageLayout>
    );
};

export default Players;