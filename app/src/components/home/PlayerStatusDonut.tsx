import PanelCard from "../ui/PanelCard";
import type { PlayerStatusBreakdown } from "../../types/Dashboard";

type PlayerStatusDonutProps = {
    data: PlayerStatusBreakdown;
};

type Segment = {
    label: string;
    value: number;
    color: string;
};

const RADIUS = 70;
const STROKE_WIDTH = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const PlayerStatusDonut = ({ data }: PlayerStatusDonutProps) => {
    const segments: Segment[] = [
        { label: "Ativos", value: data.ativos, color: "#22c55e" },
        { label: "Inativos", value: data.inativos, color: "#c4b59a" },
        { label: "Banidos", value: data.banidos, color: "#ef4444" },
    ];

    const total = data.total || 1;
    let anguloAcumulado = 0;

    return (
        <PanelCard>
            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                Status dos jogadores
            </h2>
            <p className="mb-4 text-sm text-gray-500">
                Distribuição atual da base de treinadores
            </p>

            <div className="flex justify-center">
                <svg
                    viewBox="0 0 180 180"
                    role="img"
                    aria-label="Distribuição de jogadores por status"
                    className="h-44 w-44"
                >
                    <circle
                        cx={90}
                        cy={90}
                        r={RADIUS}
                        fill="none"
                        stroke="#f1f5f9"
                        strokeWidth={STROKE_WIDTH}
                    />

                    {segments.map((segment) => {
                        const fracao = segment.value / total;
                        const comprimento = fracao * CIRCUMFERENCE;
                        const offset = (anguloAcumulado / total) * CIRCUMFERENCE;
                        anguloAcumulado += segment.value;

                        if (segment.value === 0) return null;

                        return (
                            <circle
                                key={segment.label}
                                cx={90}
                                cy={90}
                                r={RADIUS}
                                fill="none"
                                stroke={segment.color}
                                strokeWidth={STROKE_WIDTH}
                                strokeDasharray={`${comprimento} ${CIRCUMFERENCE - comprimento}`}
                                strokeDashoffset={-offset}
                                transform="rotate(-90 90 90)"
                            />
                        );
                    })}

                    <text
                        x={90}
                        y={86}
                        textAnchor="middle"
                        className="fill-gray-900 text-2xl font-extrabold"
                    >
                        {data.total.toLocaleString("pt-BR")}
                    </text>
                    <text
                        x={90}
                        y={104}
                        textAnchor="middle"
                        className="fill-gray-400 text-[10px]"
                    >
                        jogadores
                    </text>
                </svg>
            </div>

            <ul className="mt-4 flex flex-col gap-2">
                {segments.map((segment) => (
                    <li
                        key={segment.label}
                        className="flex items-center justify-between text-sm"
                    >
                        <span className="flex items-center gap-2 text-gray-600">
                            <span
                                className="h-2.5 w-2.5 rounded-full"
                                style={{ backgroundColor: segment.color }}
                            />
                            {segment.label}
                        </span>
                        <span className="font-bold text-gray-900">
                            {segment.value.toLocaleString("pt-BR")}
                        </span>
                    </li>
                ))}
            </ul>
        </PanelCard>
    );
};

export default PlayerStatusDonut;
