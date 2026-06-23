export type CardTypeCount = {
    tipo: string;
    quantidade: number;
};

export type MonthlyActivity = {
    mes: string;
    batalhas: number;
    trocas: number;
};

export type PlayerStatusBreakdown = {
    ativos: number;
    inativos: number;
    banidos: number;
    total: number;
};

export type TopTradedCard = {
    nome: string;
    trocas: number;
};

export type RecentActivityKind =
    | "troca-aberta"
    | "troca-finalizada"
    | "batalha"
    | "banimento";

export type RecentActivity = {
    id: string;
    tipo: RecentActivityKind;
    ator: string;
    acao: string;
    detalhe: string;
    data: string;
};

export type DashboardStats = {
    jogadores: {
        ativos: number;
        inativos: number;
        banidos: number;
        total: number;
    };
    trocas: {
        abertas: number;
        propostas: number;
        finalizadas: number;
        total: number;
    };
    batalhas: {
        agendadas: number;
        emAndamento: number;
        finalizadas: number;
        total: number;
    };
    cartas: {
        total: number;
    };
};

export type DashboardData = {
    stats: DashboardStats;
    atividadeMensal: MonthlyActivity[];
    statusJogadores: PlayerStatusBreakdown;
    tiposDeCartas: CardTypeCount[];
    maisNegociados: TopTradedCard[];
    atividadeRecente: RecentActivity[];
};
