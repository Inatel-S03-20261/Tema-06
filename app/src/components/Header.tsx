import { NavLink, useLocation } from "react-router-dom";
import pokeballLogo from "../assets/pokebola.png";

type HeaderProps = {
    title?: string;
    userName?: string;
    userInitial?: string;
};

const Header = ({
    title = "Painel de Administração",
    userName = "Administrador",
    userInitial = "A",
}: HeaderProps) => {
    const { pathname } = useLocation();

    const shouldShowNavigation = pathname !== "/";

    const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
        `text-sm font-medium transition ${
            isActive ? "text-red-500" : "text-gray-500 hover:text-red-500"
        }`.trim();

    return (
        <header className="h-16 w-full bg-white text-gray-800 fixed top-0 left-0 z-50 flex items-center justify-between px-8 shadow-sm border-b border-gray-200">
            <div className="flex items-center gap-4">
                <img
                    src={pokeballLogo}
                    alt="Logo Pokédex"
                    className="h-10 w-10"
                />

                <div className="flex flex-col">
                    <strong className="font-orbitron text-red-500 tracking-[0.25em] text-sm font-bold">
                        POKÉDEX
                    </strong>
                    <span className="text-gray-500 text-xs tracking-[0.3em]">
                        {title}
                    </span>
                </div>
            </div>

            {shouldShowNavigation && (
                <nav className="absolute left-1/2 -translate-x-1/2 flex gap-6">
                    <NavLink to="/" className={getNavLinkClassName}>
                        Home
                    </NavLink>

                    <NavLink to="/jogadores" className={getNavLinkClassName}>
                        Jogadores
                    </NavLink>

                    <NavLink to="/trocas" className={getNavLinkClassName}>
                        Trocas
                    </NavLink>
                </nav>
            )}

            <div className="flex items-center gap-2 rounded-full border border-gray-300 bg-gray-50 px-3 py-1 shadow-sm">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-red-400 bg-red-100 text-sm font-semibold text-red-500">
                    {userInitial}
                </span>

                <span className="text-sm font-medium text-gray-500">
                    {userName}
                </span>
            </div>
        </header>
    );
};

export default Header;