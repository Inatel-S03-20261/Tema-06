import PanelCard from "../ui/PanelCard";
import type { TopTradedCard } from "../../types/Dashboard";

type TopTradedCardsProps = {
    data: TopTradedCard[];
};

const TopTradedCards = ({ data }: TopTradedCardsProps) => {
    const maxTrocas = Math.max(1, ...data.map((item) => item.trocas));

    return (
        <PanelCard>
            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                Mais negociados
            </h2>
            <p className="mb-6 text-sm text-gray-500">
                Pokémons com maior volume de trocas
            </p>

            {data.length === 0 ? (
                <p className="text-sm text-gray-400">
                    Nenhuma troca registrada ainda.
                </p>
            ) : (
                <ul className="flex flex-col gap-4">
                    {data.map((item, indice) => (
                        <li key={item.nome} className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-gray-100 text-xs font-bold text-gray-500">
                                    {indice + 1}
                                </span>

                                <span className="flex-1 text-sm font-semibold text-gray-800">
                                    {item.nome}
                                </span>

                                <span className="text-sm text-gray-500">
                                    {item.trocas} trocas
                                </span>
                            </div>

                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
                                <div
                                    className="h-full rounded-full bg-red-500"
                                    style={{
                                        width: `${(item.trocas / maxTrocas) * 100}%`,
                                    }}
                                />
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </PanelCard>
    );
};

export default TopTradedCards;
