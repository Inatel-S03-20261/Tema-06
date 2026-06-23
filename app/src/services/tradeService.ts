import { api } from "../lib/api";
import type { Trade, TradeStatus } from "../types/Trade";

export const listarTrocas = (status?: TradeStatus, jogadorId?: string) =>
    api.get<Trade[]>(`/trades${api.buildQuery({ status, jogadorId })}`);

export const buscarTrocasPorJogador = (playerId: string) =>
    listarTrocas(undefined, playerId);

export const buscarTrocasPorStatus = (status: TradeStatus) =>
    listarTrocas(status);
