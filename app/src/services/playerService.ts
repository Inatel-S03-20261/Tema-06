import type { Player } from "../types/Player";
import { cartasMock } from "./cardService";

export const jogadoresMock: Player[] = [
    {
        id: "1",
        nome: "João",
        nivel: "Usuário",
        statusBanimento: false,
    },
    {
        id: "2",
        nome: "Maria",
        nivel: "Administrador",
        statusBanimento: false,
    },
    {
        id: "3",
        nome: "Carlos",
        nivel: "Usuário",
        statusBanimento: true,
    },
];

const cartasPorJogador: Record<string, string[]> = {
    "1": ["carta-1", "carta-3"],
    "2": ["carta-2"],
    "3": ["carta-4", "carta-1"],
};

export const buscarJogadorPorId = (id: string) => {
    return jogadoresMock.find((jogador) => jogador.id === id);
};

export const buscarCartasPorJogador = (playerId: string) => {
    const cardIds = cartasPorJogador[playerId] ?? [];

    return cartasMock.filter((carta) => cardIds.includes(carta.id));
};