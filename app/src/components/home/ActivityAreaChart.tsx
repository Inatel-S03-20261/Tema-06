import PanelCard from "../ui/PanelCard";
import type { MonthlyActivity } from "../../types/Dashboard";

type ActivityAreaChartProps = {
    data: MonthlyActivity[];
};

type Series = {
    label: string;
    color: string;
    pick: (item: MonthlyActivity) => number;
};

const SERIES: Series[] = [
    { label: "Batalhas", color: "#6366f1", pick: (item) => item.batalhas },
    { label: "Trocas", color: "#ef4444", pick: (item) => item.trocas },
];

const ActivityAreaChart = ({ data }: ActivityAreaChartProps) => {
    const maxValor = Math.max(
        1,
        ...data.flatMap((item) => [item.batalhas, item.trocas]),
    );

    return (
        <PanelCard>
            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                Atividade ao longo do tempo
            </h2>
            <p className="mb-6 text-sm text-gray-500">
                Trocas e batalhas registradas nos últimos 6 meses
            </p>

            <div className="flex h-60 items-stretch gap-3">
                {data.map((item) => (
                    <div
                        key={item.mes}
                        className="flex flex-1 flex-col items-center"
                    >
                        <div className="flex w-full flex-1 items-end justify-center gap-1.5">
                            {SERIES.map((serie) => {
                                const valor = serie.pick(item);

                                return (
                                    <div
                                        key={serie.label}
                                        className="flex h-full flex-col items-center justify-end"
                                    >
                                        <span className="mb-1 text-[10px] font-bold text-gray-600">
                                            {valor}
                                        </span>
                                        <div
                                            className="w-4 rounded-t-md"
                                            style={{
                                                height: `${(valor / maxValor) * 100}%`,
                                                backgroundColor: serie.color,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>

                        <span className="mt-2 text-[11px] text-gray-500">
                            {item.mes}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-center gap-6">
                {SERIES.map((serie) => (
                    <span
                        key={serie.label}
                        className="flex items-center gap-2 text-xs text-gray-600"
                    >
                        <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: serie.color }}
                        />
                        {serie.label}
                    </span>
                ))}
            </div>
        </PanelCard>
    );
};

export default ActivityAreaChart;
