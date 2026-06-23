import type { Card } from "./Card";
import type { Player } from "./Player";

export type TradeStatus = "Aberta" | "Proposta" | "Finalizada";

export type Trade = {
    id: string;
    jogadorOrigem: Pick<Player, "id" | "nome">;
    jogadorDestino?: Pick<Player, "id" | "nome">;
    cartasOfertadas: Card[];
    status: TradeStatus;
    criadoEm: string;
};
