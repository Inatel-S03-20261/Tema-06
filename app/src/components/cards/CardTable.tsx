import type { ReactNode } from "react";

import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";
import type { Card } from "../../types/Card";

type CardTableProps = {
    cards: Card[];
    filters?: ReactNode;
};

const rarityTone: Record<string, "gray" | "blue" | "yellow" | "red"> = {
    Comum: "gray",
    Rara: "blue",
    Épica: "yellow",
    Lendária: "red",
};

const CardTable = ({ cards, filters }: CardTableProps) => {
    return (
        <DataTable
            title="Lista de Cartas"
            countLabel={`${cards.length.toLocaleString("pt-BR")} cartas`}
            columns={["Carta", "Tipo", "Raridade", "Ataque", "Defesa"]}
            filters={filters}
            gridClassName="grid grid-cols-[minmax(12rem,1fr)_8rem_9rem_7rem_7rem] items-center gap-4"
        >
            {cards.map((card) => (
                <div
                    key={card.id}
                    className="grid grid-cols-[minmax(12rem,1fr)_8rem_9rem_7rem_7rem] items-center gap-4 border-b border-gray-100 px-4 py-3 text-sm last:border-b-0"
                >
                    <strong className="text-gray-900">{card.nome}</strong>
                    <span className="text-gray-500">{card.tipo}</span>
                    <Badge tone={rarityTone[card.raridade] ?? "gray"}>
                        {card.raridade}
                    </Badge>
                    <span className="text-gray-500">{card.ataque}</span>
                    <span className="text-gray-500">{card.defesa}</span>
                </div>
            ))}
            {cards.length === 0 && (
                <p className="px-4 py-4 text-sm text-gray-500">
                    Nenhuma carta encontrada.
                </p>
            )}
        </DataTable>
    );
};

export default CardTable;
