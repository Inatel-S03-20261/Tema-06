import { useState } from "react";
import ClearFiltersButton from "../components/ClearFiltersButton";
import PageLayout from "../components/PageLayout";
import PlayerList from "../components/players/PlayerList";
import SearchInput from "../components/SearchInput";
import { jogadoresMock } from "../services/playerService";
import type { Player } from "../types/Player";

const Players = () => {
    const [jogadores, setJogadores] = useState<Player[]>(jogadoresMock);
    const [filtro, setFiltro] = useState("");
    const hasActiveFilters = filtro !== "";

    const jogadoresFiltrados = jogadores.filter((jogador) =>
        jogador.nome.toLowerCase().includes(filtro.toLowerCase()),
    );

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
        <PageLayout title="Jogadores">
            <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end">
                <SearchInput
                    value={filtro}
                    onChange={setFiltro}
                    placeholder="Filtrar por nome"
                />
                <ClearFiltersButton
                    onClick={() => setFiltro("")}
                    disabled={!hasActiveFilters}
                />
            </div>

            <PlayerList
                players={jogadoresFiltrados}
                onToggleBan={alterarBanimento}
                onToggleLevel={alterarNivel}
            />
        </PageLayout>
    );
};

export default Players;