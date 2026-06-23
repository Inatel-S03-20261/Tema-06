import { api } from "../lib/api";
import type { Battle, BattleStatus } from "../types/Battle";

export const listarBatalhas = (status?: BattleStatus, jogadorId?: string) =>
    api.get<Battle[]>(`/battles${api.buildQuery({ status, jogadorId })}`);

export const buscarBatalhasPorJogador = (playerId: string) =>
    listarBatalhas(undefined, playerId);
