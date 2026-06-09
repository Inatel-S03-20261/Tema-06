import { useEffect, useMemo, useState } from "react";

import { jogadoresMock } from "../services/playerService";
import type { Player } from "../types/Player";

type StatusFiltro = "Todos" | "Ativos" | "Admins" | "Inativos" | "Banidos";

const statusOptions: StatusFiltro[] = [
    "Todos",
    "Ativos",
    "Admins",
    "Inativos",
    "Banidos",
];

export const usePlayersFacade = () => {
    const [jogadores, setJogadores] = useState<Player[]>(jogadoresMock);
    const [filtro, setFiltro] = useState("");
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("Todos");

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

    const selecionarJogador = (id: string) => {
        setSelectedPlayerId(id);
        setIsDetailsOpen(true);
    };

    const fecharDetalhes = () => {
        setIsDetailsOpen(false);
    };

    const alternarFiltros = () => {
        setIsFilterOpen((value) => !value);
    };

    const alterarBanimento = (id: string) => {
        setJogadores((jogadoresAtuais) =>
            jogadoresAtuais.map((jogador) => {
                if (jogador.id === id) {
                    return {
                        ...jogador,
                        statusBanimento: !jogador.statusBanimento,
                    };
                }

                return jogador;
            }),
        );
    };

    const alterarNivel = (id: string) => {
        setJogadores((jogadoresAtuais) =>
            jogadoresAtuais.map((jogador) => {
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
            }),
        );
    };

    return {
        filtro,
        setFiltro,

        statusFiltro,
        setStatusFiltro,
        statusOptions,

        jogadoresFiltrados,
        selectedPlayer,
        selectedPlayerId,

        isDetailsOpen,
        isFilterOpen,

        selecionarJogador,
        fecharDetalhes,
        alternarFiltros,

        alterarBanimento,
        alterarNivel,
    };
};