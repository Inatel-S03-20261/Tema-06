export type PlayerLevel = "Usuário" | "Administrador";

export type Player = {
    id: string;
    nome: string;
    nivel: PlayerLevel;
    statusBanimento: boolean;
    ativo: boolean;
    criadoEm: string;
};