import { useEffect, useMemo, useState } from "react";

import {
    alterarNivelJogador,
    banirJogador,
    listarJogadores,
} from "../services/playerService";
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
    const [jogadores, setJogadores] = useState<Player[]>([]);
    const [filtro, setFiltro] = useState("");
    const [selectedPlayerId, setSelectedPlayerId] = useState<string>();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [statusFiltro, setStatusFiltro] = useState<StatusFiltro>("Todos");

    useEffect(() => {
        listarJogadores()
            .then(setJogadores)
            .catch((erro) => console.error("Erro ao carregar jogadores", erro));
    }, []);

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
                        !jogador.statusBanimento &&
                        !jogador.ativo);

                return correspondePesquisa && correspondeStatus;
            }),
        [filtro, jogadores, statusFiltro],
    );

    // Seleção efetiva derivada no render (sem setState em effect): usa o jogador
    // escolhido se ele ainda estiver na lista filtrada, senão cai no primeiro.
    const hasSelectedPlayer = jogadoresFiltrados.some(
        (jogador) => jogador.id === selectedPlayerId,
    );
    const effectiveSelectedId = hasSelectedPlayer
        ? selectedPlayerId
        : jogadoresFiltrados[0]?.id;

    const selectedPlayer = jogadoresFiltrados.find(
        (jogador) => jogador.id === effectiveSelectedId,
    );

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

    const alterarBanimento = async (id: string) => {
        const jogador = jogadores.find((item) => item.id === id);
        if (!jogador) return;

        try {
            const atualizado = await banirJogador(
                id,
                !jogador.statusBanimento,
            );
            setJogadores((jogadoresAtuais) =>
                jogadoresAtuais.map((item) =>
                    item.id === id ? atualizado : item,
                ),
            );
        } catch (erro) {
            console.error("Erro ao alterar banimento", erro);
        }
    };

    const alterarNivel = async (id: string) => {
        const jogador = jogadores.find((item) => item.id === id);
        if (!jogador) return;

        const novoNivel: Player["nivel"] =
            jogador.nivel === "Administrador" ? "Usuário" : "Administrador";

        try {
            const atualizado = await alterarNivelJogador(id, novoNivel);
            setJogadores((jogadoresAtuais) =>
                jogadoresAtuais.map((item) =>
                    item.id === id ? atualizado : item,
                ),
            );
        } catch (erro) {
            console.error("Erro ao alterar nível", erro);
        }
    };

    return {
        filtro,
        setFiltro,

        statusFiltro,
        setStatusFiltro,
        statusOptions,

        jogadoresFiltrados,
        selectedPlayer,
        selectedPlayerId: effectiveSelectedId,

        isDetailsOpen,
        isFilterOpen,

        selecionarJogador,
        fecharDetalhes,
        alternarFiltros,

        alterarBanimento,
        alterarNivel,
    };
};