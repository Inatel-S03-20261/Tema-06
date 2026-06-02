import { jogadoresMock } from "./playerService";
import type { Battle } from "../types/Battle";

export const batalhasMock: Battle[] = [
    {
        id: "batalha-1",
        jogadorA: jogadoresMock[0],
        jogadorB: jogadoresMock[1],
        status: "Finalizada",
        vencedorId: jogadoresMock[0].id,
        data: "2026-06-01",
    },
    {
        id: "batalha-2",
        jogadorA: jogadoresMock[1],
        jogadorB: jogadoresMock[2],
        status: "Em andamento",
        data: "2026-06-01",
    },
    {
        id: "batalha-3",
        jogadorA: jogadoresMock[2],
        jogadorB: jogadoresMock[0],
        status: "Agendada",
        data: "2026-06-02",
    },
];

export const buscarBatalhasPorJogador = (playerId: string) => {
    return batalhasMock.filter(
        (batalha) =>
            batalha.jogadorA.id === playerId || batalha.jogadorB.id === playerId,
    );
};
