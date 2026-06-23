import type { LucideIcon } from "lucide-react";

import PanelCard from "../ui/PanelCard";

type DashboardStatCardProps = {
    title: string;
    value: number;
    subtitle: string;
    icon: LucideIcon;
    iconClassName: string;
};

const DashboardStatCard = ({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClassName,
}: DashboardStatCardProps) => {
    return (
        <PanelCard className="flex items-start justify-between">
            <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                    {title}
                </p>

                <p className="mt-1 text-3xl font-extrabold text-gray-900">
                    {value.toLocaleString("pt-BR")}
                </p>

                <p className="mt-1 text-xs text-gray-500">{subtitle}</p>
            </div>

            <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}
            >
                <Icon size={20} strokeWidth={2.4} />
            </span>
        </PanelCard>
    );
};

export default DashboardStatCard;
