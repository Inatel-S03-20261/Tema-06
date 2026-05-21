import type { Trade } from "../../types/Trade";

type TradeListProps = {
    trades: Trade[];
};

const TradeList = ({ trades }: TradeListProps) => {
    if (trades.length === 0) {
        return <p>Nenhuma troca encontrada.</p>;
    }

    return (
        <div className="flex flex-col gap-4">
            {trades.map((trade) => (
                <article
                    key={trade.id}
                    className="border border-gray-300 rounded p-4 flex flex-col gap-2"
                >
                    <h3 className="text-xl font-semibold flex flex-wrap items-center gap-2">
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded">
                            Oferece: {trade.jogadorOrigem.nome}
                        </span>
                        <span className="text-gray-500">→</span>
                        {trade.jogadorDestino ? (
                            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded">
                                Recebe: {trade.jogadorDestino.nome}
                            </span>
                        ) : (
                            <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded">
                                Aguardando proposta
                            </span>
                        )}
                    </h3>
                    <p>Status: {trade.status}</p>
                    <p>
                        Cartas:{" "}
                        {trade.cartasOfertadas
                            .map((card) => card.nome)
                            .join(", ")}
                    </p>
                </article>
            ))}
        </div>
    );
};

export default TradeList;
