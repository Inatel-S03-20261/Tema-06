import { NavLink } from "react-router-dom";
import {
    Home,
    Users,
    Layers,
    Swords,
    ArrowLeftRight,
} from "lucide-react";

const navItems = [
    {
        label: "Início",
        to: "/",
        icon: Home,
    },
    {
        label: "Jogadores",
        to: "/jogadores",
        icon: Users,
    },
    {
        label: "Cartas",
        to: "/cartas",
        icon: Layers,
    },
    {
        label: "Batalhas",
        to: "/batalhas",
        icon: Swords,
    },
    {
        label: "Trocas",
        to: "/trocas",
        icon: ArrowLeftRight,
    },
];

const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 z-50 h-16 w-full bg-slate-950 text-gray-500 shadow-lg">
            <ul className="flex h-full items-center justify-around">
                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <li key={item.to}>
                            <NavLink
                                to={item.to}
                                className={({ isActive }) =>
                                    `mx-auto flex h-12 w-20 flex-col items-center justify-center gap-0.5 text-[11px] font-semibold tracking-wide transition-colors ${
                                        isActive
                                            ? "text-red-500"
                                            : "text-gray-500 hover:text-gray-300"
                                    }`
                                }
                            >
                                <Icon size={18} strokeWidth={2.2} />
                                <span>{item.label}</span>
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export default BottomNav;