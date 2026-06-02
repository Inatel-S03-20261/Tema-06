import type { ReactNode } from "react";

import Badge from "../ui/Badge";
import DataTable from "../ui/DataTable";
import Tooltip from "../ui/Tooltip";
import type { Trade } from "../../types/Trade";
import type { TradeStatus } from "../../types/Trade";

type TradeTableProps = {
    trades: Trade[];
    filters?: ReactNode;
};

const statusTone: Record<TradeStatus, "blue" | "green" | "yellow"> = {
    Aberta: "blue",
    Proposta: "yellow",
    Finalizada: "green",
};

const TradeTable = ({ trades, filters }: TradeTableProps) => {
    return (
        <DataTable
            title={
                <>
                    Lista de Trocas
                    <Tooltip
                        align="start"
                        placement="bottom"
                        content="Aberta: disponível para negociação. Proposta: oferta recebida em análise. Finalizada: troca concluída."
                    />
                </>
            }
            countLabel={`${trades.length.toLocaleString("pt-BR")} trocas`}
            columns={["Origem", "Destino", "Status", "Cartas"]}
            filters={filters}
            gridClassName="grid grid-cols-[10rem_12rem_8rem_minmax(16rem,1fr)] items-center gap-4"
        >
            {trades.map((trade) => (
                <div
                    key={trade.id}
                    className="grid grid-cols-[10rem_12rem_8rem_minmax(16rem,1fr)] items-center gap-4 border-b border-gray-100 px-4 py-3 text-sm last:border-b-0"
                >
                    <strong className="text-gray-900">
                        {trade.jogadorOrigem.nome}
                    </strong>
                    <span className="text-gray-500">
                        {trade.jogadorDestino?.nome ?? "Aguardando proposta"}
                    </span>
                    <Badge tone={statusTone[trade.status]}>
                        {trade.status}
                    </Badge>
                    <span className="text-gray-500">
                        {trade.cartasOfertadas
                            .map((card) => card.nome)
                            .join(", ")}
                    </span>
                </div>
            ))}
            {trades.length === 0 && (
                <p className="px-4 py-4 text-sm text-gray-500">
                    Nenhuma troca encontrada.
                </p>
            )}
        </DataTable>
    );
};

export default TradeTable;
