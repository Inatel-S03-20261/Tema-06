import { useEffect, useMemo, useState } from "react";

import PageLayout from "../components/layout/PageLayout";
import PlayerDetailsSidebar from "../components/players/PlayerDetailsSidebar";
import PlayerTable from "../components/players/PlayerTable";
import { jogadoresMock } from "../services/playerService";
import type { Player } from "../types/Player";

const Players = () => {
    const [jogadores, setJogadores] = useState<Player[]>(jogadoresMock);
    const [filtro, setFiltro] = useState("");
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const hasActiveFilters = filtro !== "";

    const jogadoresFiltrados = useMemo(
        () =>
            jogadores.filter((jogador) =>
                jogador.nome.toLowerCase().includes(filtro.toLowerCase()),
            ),
        [filtro, jogadores],
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
            contentClassName="relative"
        >
            <PlayerTable
                players={jogadoresFiltrados}
                filter={filtro}
                selectedPlayerId={isDetailsOpen ? selectedPlayerId : undefined}
                hasActiveFilters={hasActiveFilters}
                onFilterChange={setFiltro}
                onClearFilters={() => setFiltro("")}
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