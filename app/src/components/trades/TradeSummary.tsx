import type { Trade } from "../../types/Trade";
import type { TradeStatus } from "../../types/Trade";

type TradeSummaryProps = {
    trades: Trade[];
};

const statusList: TradeStatus[] = ["Aberta", "Proposta", "Finalizada"];

const TradeSummary = ({ trades }: TradeSummaryProps) => {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {statusList.map((status) => (
                <article
                    key={status}
                    className="border border-gray-300 rounded p-4"
                >
                    <h2 className="text-xl font-semibold">{status}</h2>
                    <p>{trades.filter((trade) => trade.status === status).length}</p>
                </article>
            ))}
        </div>
    );
};

export default TradeSummary;
