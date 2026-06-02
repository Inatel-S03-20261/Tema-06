import type { Player } from "./Player";

export type BattleStatus = "Agendada" | "Em andamento" | "Finalizada";

export type Battle = {
    id: string;
    jogadorA: Pick<Player, "id" | "nome">;
    jogadorB: Pick<Player, "id" | "nome">;
    status: BattleStatus;
    vencedorId?: string;
    data: string;
};
