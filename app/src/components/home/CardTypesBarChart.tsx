import PanelCard from "../ui/PanelCard";
import type { CardTypeCount } from "../../types/Dashboard";

type CardTypesBarChartProps = {
    data: CardTypeCount[];
};

const TYPE_COLORS: Record<string, string> = {
    Fogo: "#ef4444",
    Água: "#3b82f6",
    Planta: "#22c55e",
    Elétrico: "#eab308",
    Psíquico: "#ec4899",
    Normal: "#b8a98a",
    Lutador: "#c2622d",
    Pedra: "#a3855f",
};

const FALLBACK_COLOR = "#6366f1";

const CardTypesBarChart = ({ data }: CardTypesBarChartProps) => {
    const maxQuantidade = Math.max(1, ...data.map((item) => item.quantidade));

    return (
        <PanelCard>
            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                Distribuição por tipo
            </h2>
            <p className="mb-6 text-sm text-gray-500">
                Cartas cadastradas agrupadas por tipo elemental
            </p>

            {data.length === 0 ? (
                <p className="text-sm text-gray-400">
                    Nenhuma carta cadastrada para exibir.
                </p>
            ) : (
                <div className="flex h-60 items-stretch gap-3">
                    {data.map((item) => (
                        <div
                            key={item.tipo}
                            className="flex flex-1 flex-col items-center"
                        >
                            <div className="flex w-full flex-1 flex-col items-center justify-end">
                                <span className="mb-1 text-xs font-bold text-gray-700">
                                    {item.quantidade}
                                </span>
                                <div
                                    className="w-8 rounded-t-md"
                                    style={{
                                        height: `${(item.quantidade / maxQuantidade) * 100}%`,
                                        backgroundColor:
                                            TYPE_COLORS[item.tipo] ??
                                            FALLBACK_COLOR,
                                    }}
                                />
                            </div>

                            <span className="mt-2 text-[11px] text-gray-500">
                                {item.tipo}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </PanelCard>
    );
};

export default CardTypesBarChart;
