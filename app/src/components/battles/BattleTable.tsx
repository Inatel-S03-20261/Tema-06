import type { ReactNode } from "react";

import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";
import type { Battle, BattleStatus } from "../../types/Battle";

type BattleTableProps = {
    battles: Battle[];
    filters?: ReactNode;
};

const statusTone: Record<BattleStatus, "blue" | "green" | "yellow"> = {
    Agendada: "blue",
    "Em andamento": "yellow",
    Finalizada: "green",
};

const formatDate = (date: string) => date.split("-").reverse().join("/");

const BattleTable = ({ battles, filters }: BattleTableProps) => {
    return (
        <DataTable
            title="Lista de Batalhas"
            countLabel={`${battles.length.toLocaleString("pt-BR")} batalhas`}
            columns={["Jogador A", "Jogador B", "Data", "Status", "Vencedor"]}
            filters={filters}
            gridClassName="grid grid-cols-[10rem_10rem_7rem_10rem_10rem] items-center gap-4"
        >
            {battles.map((battle) => {
                const vencedor =
                    battle.vencedorId === battle.jogadorA.id
                        ? battle.jogadorA.nome
                        : battle.jogadorB.nome;

                return (
                    <div
                        key={battle.id}
                        className="grid grid-cols-[10rem_10rem_7rem_10rem_10rem] items-center gap-4 border-b border-gray-100 px-4 py-3 text-sm last:border-b-0"
                    >
                        <strong className="text-gray-900">
                            {battle.jogadorA.nome}
                        </strong>
                        <span className="text-gray-500">
                            {battle.jogadorB.nome}
                        </span>
                        <span className="text-gray-500">
                            {formatDate(battle.data)}
                        </span>
                        <Badge tone={statusTone[battle.status]}>
                            {battle.status}
                        </Badge>
                        <span className="text-gray-500">
                            {battle.vencedorId ? vencedor : "Pendente"}
                        </span>
                    </div>
                );
            })}
            {battles.length === 0 && (
                <p className="px-4 py-4 text-sm text-gray-500">
                    Nenhuma batalha encontrada.
                </p>
            )}
        </DataTable>
    );
};

export default BattleTable;
