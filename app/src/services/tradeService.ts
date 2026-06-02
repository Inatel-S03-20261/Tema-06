import { cartasMock } from "./cardService";
import { jogadoresMock } from "./playerService";
import type { Trade, TradeStatus } from "../types/Trade";

export const trocasMock: Trade[] = [
    {
        id: "troca-1",
        jogadorOrigem: jogadoresMock[0],
        cartasOfertadas: [cartasMock[0], cartasMock[2]],
        status: "Aberta",
    },
    {
        id: "troca-2",
        jogadorOrigem: jogadoresMock[1],
        jogadorDestino: jogadoresMock[2],
        cartasOfertadas: [cartasMock[1]],
        status: "Proposta",
    },
    {
        id: "troca-3",
        jogadorOrigem: jogadoresMock[2],
        jogadorDestino: jogadoresMock[0],
        cartasOfertadas: [cartasMock[3]],
        status: "Finalizada",
    },
];

export const buscarTrocasPorJogador = (playerId: string) => {
    return trocasMock.filter(
        (troca) =>
            troca.jogadorOrigem.id === playerId ||
            troca.jogadorDestino?.id === playerId,
    );
};

export const buscarTrocasPorStatus = (status: TradeStatus) => {
    return trocasMock.filter((troca) => troca.status === status);
};
