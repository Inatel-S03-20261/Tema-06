import type { Battle } from "../types/Battle";
import type { Card } from "../types/Card";
import type {
    CardTypeCount,
    DashboardStats,
    MonthlyActivity,
    PlayerStatusBreakdown,
    RecentActivity,
    TopTradedCard,
} from "../types/Dashboard";
import type { Player } from "../types/Player";
import type { Trade } from "../types/Trade";

const MESES_PT = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
];

const QUANTIDADE_MAIS_NEGOCIADOS = 5;
const QUANTIDADE_ATIVIDADE_RECENTE = 6;
const MESES_NA_LINHA_DO_TEMPO = 6;

export const calcularStats = (
    jogadores: Player[],
    cartas: Card[],
    batalhas: Battle[],
    trocas: Trade[],
): DashboardStats => ({
    jogadores: {
        ativos: jogadores.filter((j) => !j.statusBanimento && j.ativo).length,
        inativos: jogadores.filter((j) => !j.statusBanimento && !j.ativo).length,
        banidos: jogadores.filter((j) => j.statusBanimento).length,
        total: jogadores.length,
    },
    trocas: {
        abertas: trocas.filter((t) => t.status === "Aberta").length,
        propostas: trocas.filter((t) => t.status === "Proposta").length,
        finalizadas: trocas.filter((t) => t.status === "Finalizada").length,
        total: trocas.length,
    },
    batalhas: {
        agendadas: batalhas.filter((b) => b.status === "Agendada").length,
        emAndamento: batalhas.filter((b) => b.status === "Em andamento").length,
        finalizadas: batalhas.filter((b) => b.status === "Finalizada").length,
        total: batalhas.length,
    },
    cartas: {
        total: cartas.length,
    },
});

export const calcularStatusJogadores = (
    jogadores: Player[],
): PlayerStatusBreakdown => ({
    ativos: jogadores.filter((j) => !j.statusBanimento && j.ativo).length,
    inativos: jogadores.filter((j) => !j.statusBanimento && !j.ativo).length,
    banidos: jogadores.filter((j) => j.statusBanimento).length,
    total: jogadores.length,
});

export const contarPorTipo = (cartas: Card[]): CardTypeCount[] => {
    const contagem = cartas.reduce<Record<string, number>>((acc, carta) => {
        acc[carta.tipo] = (acc[carta.tipo] ?? 0) + 1;
        return acc;
    }, {});

    return Object.entries(contagem)
        .map(([tipo, quantidade]) => ({ tipo, quantidade }))
        .sort((a, b) => b.quantidade - a.quantidade);
};

const chaveDoMes = (data: Date) => `${data.getFullYear()}-${data.getMonth()}`;

const mesMaisRecente = (trocas: Trade[], batalhas: Battle[]): Date => {
    const datas = [
        ...trocas.map((t) => new Date(t.criadoEm)),
        ...batalhas.map((b) => new Date(b.data)),
    ].filter((data) => !Number.isNaN(data.getTime()));

    if (datas.length === 0) return new Date();

    return datas.reduce((maior, atual) => (atual > maior ? atual : maior));
};

/**
 * Agrupa trocas e batalhas pelos últimos seis meses para alimentar o gráfico de
 * atividade ao longo do tempo, usando o mês mais recente dos dados como âncora.
 */
export const calcularAtividadeMensal = (
    trocas: Trade[],
    batalhas: Battle[],
): MonthlyActivity[] => {
    const referencia = mesMaisRecente(trocas, batalhas);

    const baldes = Array.from({ length: MESES_NA_LINHA_DO_TEMPO }, (_, indice) => {
        const offset = MESES_NA_LINHA_DO_TEMPO - 1 - indice;
        const data = new Date(
            referencia.getFullYear(),
            referencia.getMonth() - offset,
            1,
        );

        return {
            chave: chaveDoMes(data),
            mes: MESES_PT[data.getMonth()],
            batalhas: 0,
            trocas: 0,
        };
    });

    const indicePorChave = new Map(
        baldes.map((balde, indice) => [balde.chave, indice]),
    );

    for (const troca of trocas) {
        const indice = indicePorChave.get(chaveDoMes(new Date(troca.criadoEm)));
        if (indice !== undefined) baldes[indice].trocas += 1;
    }

    for (const batalha of batalhas) {
        const indice = indicePorChave.get(chaveDoMes(new Date(batalha.data)));
        if (indice !== undefined) baldes[indice].batalhas += 1;
    }

    return baldes.map(({ mes, batalhas: b, trocas: t }) => ({
        mes,
        batalhas: b,
        trocas: t,
    }));
};

export const calcularMaisNegociados = (trocas: Trade[]): TopTradedCard[] => {
    const contagem = trocas.reduce<Record<string, number>>((acc, troca) => {
        for (const carta of troca.cartasOfertadas) {
            acc[carta.nome] = (acc[carta.nome] ?? 0) + 1;
        }
        return acc;
    }, {});

    return Object.entries(contagem)
        .map(([nome, trocasCarta]) => ({ nome, trocas: trocasCarta }))
        .sort((a, b) => b.trocas - a.trocas)
        .slice(0, QUANTIDADE_MAIS_NEGOCIADOS);
};

const nomesDasCartas = (trade: Trade) =>
    trade.cartasOfertadas.map((carta) => carta.nome).join(", ");

export const calcularAtividadeRecente = (
    jogadores: Player[],
    batalhas: Battle[],
    trocas: Trade[],
): RecentActivity[] => {
    const eventosDeTrocas: RecentActivity[] = trocas
        .filter((troca) => troca.status !== "Proposta")
        .map((troca) => ({
            id: `troca-${troca.id}`,
            tipo:
                troca.status === "Finalizada"
                    ? "troca-finalizada"
                    : "troca-aberta",
            ator: troca.jogadorOrigem.nome,
            acao:
                troca.status === "Finalizada"
                    ? "Finalizou uma troca"
                    : "Abriu uma troca",
            detalhe: nomesDasCartas(troca) || "Sem cartas ofertadas",
            data: troca.criadoEm,
        }));

    const eventosDeBatalhas: RecentActivity[] = batalhas
        .filter((batalha) => batalha.status === "Finalizada" && batalha.vencedorId)
        .map((batalha) => {
            const vencedor =
                batalha.vencedorId === batalha.jogadorA.id
                    ? batalha.jogadorA
                    : batalha.jogadorB;
            const adversario =
                batalha.vencedorId === batalha.jogadorA.id
                    ? batalha.jogadorB
                    : batalha.jogadorA;

            return {
                id: `batalha-${batalha.id}`,
                tipo: "batalha",
                ator: vencedor.nome,
                acao: "Venceu uma batalha",
                detalhe: `vs. ${adversario.nome}`,
                data: batalha.data,
            };
        });

    const eventosDeBanimentos: RecentActivity[] = jogadores
        .filter((jogador) => jogador.statusBanimento)
        .map((jogador) => ({
            id: `ban-${jogador.id}`,
            tipo: "banimento",
            ator: jogador.nome,
            acao: "Conta banida",
            detalhe: "Conta suspensa por violação das regras",
            data: jogador.criadoEm,
        }));

    return [...eventosDeTrocas, ...eventosDeBatalhas, ...eventosDeBanimentos]
        .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())
        .slice(0, QUANTIDADE_ATIVIDADE_RECENTE);
};

/**
 * Converte uma data ISO em tempo relativo curto (ex.: "há 2 min", "há 3 d").
 * @param dataIso data de referência em formato ISO.
 * @returns texto relativo ao momento atual.
 */
export const formatarTempoRelativo = (dataIso: string): string => {
    const timestamp = new Date(dataIso).getTime();
    if (Number.isNaN(timestamp) || timestamp === 0) return "—";

    const diferencaMs = Date.now() - timestamp;
    const minutos = Math.floor(diferencaMs / 60000);

    if (minutos < 1) return "agora";
    if (minutos < 60) return `há ${minutos} min`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `há ${horas} h`;

    const dias = Math.floor(horas / 24);
    if (dias < 30) return `há ${dias} d`;

    const meses = Math.floor(dias / 30);
    return `há ${meses} mês${meses > 1 ? "es" : ""}`;
};
