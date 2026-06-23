import { api } from "../lib/api";
import type { Card } from "../types/Card";

export const listarCartas = (nome?: string, tipo?: string) =>
    api.get<Card[]>(`/cards${api.buildQuery({ nome, tipo })}`);

export const buscarCartaPorId = (id: string) =>
    api.get<Card>(`/cards/${id}`);
