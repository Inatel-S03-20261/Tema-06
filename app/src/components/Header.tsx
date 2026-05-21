import { NavLink, useLocation } from "react-router-dom";

type HeaderProps = {
    title?: string;
};

const Header = ({ title = "Painel de Administração" }: HeaderProps) => {
    const { pathname } = useLocation();
    const shouldShowNavigation = pathname !== "/";
    const getNavLinkClassName = ({ isActive }: { isActive: boolean }) =>
        `rounded px-2 py-1 ${isActive ? "bg-white text-indigo-600" : ""}`.trim();

    return (
        <header className="h-16 w-full bg-indigo-500 text-white font-medium fixed flex items-center justify-center px-8">
            {shouldShowNavigation && (
                <nav className="absolute left-8 flex gap-4 text-base">
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

            <strong className="text-2xl">{title}</strong>
        </header>
    );
};

export default Header;
