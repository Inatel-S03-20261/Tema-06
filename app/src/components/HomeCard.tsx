import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

type HomeCardProps = {
    title: string;
    description: string;
    to: string;
    badge: string;
    icon: LucideIcon;
    iconClassName: string;
    badgeClassName: string;
};

const HomeCard = ({
    title,
    description,
    to,
    badge,
    icon: Icon,
    iconClassName,
    badgeClassName,
}: HomeCardProps) => {
    return (
        <Link
            to={to}
            className="block min-h-36 rounded-2xl bg-white p-5 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
        >
            <div className="flex items-start justify-between">
                <div>
                    <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl ${iconClassName}`}>
                        <Icon size={22} strokeWidth={2.4} />
                    </div>

                    <h2 className="text-lg font-bold tracking-wide text-gray-900">
                        {title}
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        {description}
                    </p>
                </div>

                <ArrowRight size={18} className="text-gray-400" />
            </div>

            <div className="my-5 border-t border-gray-200" />

            <span className={`rounded-full px-4 py-1 text-xs font-bold ${badgeClassName}`}>
                {badge}
            </span>
        </Link>
    );
};

export default HomeCard;