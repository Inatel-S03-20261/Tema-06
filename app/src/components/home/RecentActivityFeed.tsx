import { ArrowLeftRight, ShieldX, Swords } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import PanelCard from "../ui/PanelCard";
import { formatarTempoRelativo } from "../../lib/dashboardStats";
import type {
    RecentActivity,
    RecentActivityKind,
} from "../../types/Dashboard";

type RecentActivityFeedProps = {
    data: RecentActivity[];
};

const ICON_BY_KIND: Record<
    RecentActivityKind,
    { icon: LucideIcon; className: string }
> = {
    "troca-aberta": {
        icon: ArrowLeftRight,
        className: "bg-green-100 text-green-600",
    },
    "troca-finalizada": {
        icon: ArrowLeftRight,
        className: "bg-green-100 text-green-600",
    },
    batalha: { icon: Swords, className: "bg-yellow-100 text-yellow-600" },
    banimento: { icon: ShieldX, className: "bg-red-100 text-red-500" },
};

const RecentActivityFeed = ({ data }: RecentActivityFeedProps) => {
    return (
        <PanelCard>
            <h2 className="text-lg font-bold tracking-wide text-gray-900">
                Atividade recente
            </h2>
            <p className="mb-4 text-sm text-gray-500">
                Últimas ações registradas no sistema
            </p>

            {data.length === 0 ? (
                <p className="text-sm text-gray-400">
                    Nenhuma atividade registrada ainda.
                </p>
            ) : (
                <ul className="flex flex-col">
                    {data.map((evento) => {
                        const { icon: Icon, className } =
                            ICON_BY_KIND[evento.tipo];

                        return (
                            <li
                                key={evento.id}
                                className="flex items-center gap-4 border-b border-gray-100 py-3 last:border-b-0"
                            >
                                <span
                                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${className}`}
                                >
                                    <Icon size={16} strokeWidth={2.4} />
                                </span>

                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-gray-800">
                                        {evento.ator} · {evento.acao}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {evento.detalhe}
                                    </p>
                                </div>

                                <span className="shrink-0 text-xs text-gray-400">
                                    {formatarTempoRelativo(evento.data)}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </PanelCard>
    );
};

export default RecentActivityFeed;
