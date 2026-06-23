import { api } from "../lib/api";
import type { Player } from "../types/Player";
import type { Card } from "../types/Card";

export const listarJogadores = (nome?: string) =>
    api.get<Player[]>(`/players${api.buildQuery({ nome })}`);

export const buscarJogadorPorId = (id: string) =>
    api.get<Player>(`/players/${id}`);

export const buscarCartasPorJogador = (playerId: string) =>
    api.get<Card[]>(`/players/${playerId}/cards`);

export const banirJogador = (id: string, statusBanimento: boolean) =>
    api.patch<Player>(`/players/${id}/ban`, { statusBanimento });

export const alterarNivelJogador = (id: string, nivel: Player["nivel"]) =>
    api.patch<Player>(`/players/${id}/level`, { nivel });
