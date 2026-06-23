import { useEffect, useMemo, useState } from "react";

import {
    calcularAtividadeMensal,
    calcularAtividadeRecente,
    calcularMaisNegociados,
    calcularStats,
    calcularStatusJogadores,
    contarPorTipo,
} from "../lib/dashboardStats";
import { listarBatalhas } from "../services/battleService";
import { listarCartas } from "../services/cardService";
import { listarJogadores } from "../services/playerService";
import { listarTrocas } from "../services/tradeService";
import type { Battle } from "../types/Battle";
import type { Card } from "../types/Card";
import type { DashboardData } from "../types/Dashboard";
import type { Player } from "../types/Player";
import type { Trade } from "../types/Trade";

export const useDashboardFacade = () => {
    const [jogadores, setJogadores] = useState<Player[]>([]);
    const [cartas, setCartas] = useState<Card[]>([]);
    const [batalhas, setBatalhas] = useState<Battle[]>([]);
    const [trocas, setTrocas] = useState<Trade[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            listarJogadores(),
            listarCartas(),
            listarBatalhas(),
            listarTrocas(),
        ])
            .then(([jogadoresData, cartasData, batalhasData, trocasData]) => {
                setJogadores(jogadoresData);
                setCartas(cartasData);
                setBatalhas(batalhasData);
                setTrocas(trocasData);
            })
            .catch((erro) =>
                console.error("Erro ao carregar dados do dashboard", erro),
            )
            .finally(() => setIsLoading(false));
    }, []);

    const dashboard = useMemo<DashboardData>(
        () => ({
            stats: calcularStats(jogadores, cartas, batalhas, trocas),
            atividadeMensal: calcularAtividadeMensal(trocas, batalhas),
            statusJogadores: calcularStatusJogadores(jogadores),
            tiposDeCartas: contarPorTipo(cartas),
            maisNegociados: calcularMaisNegociados(trocas),
            atividadeRecente: calcularAtividadeRecente(
                jogadores,
                batalhas,
                trocas,
            ),
        }),
        [batalhas, cartas, jogadores, trocas],
    );

    return { dashboard, isLoading };
};
