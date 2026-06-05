import type { ReactNode } from "react";
import { ArrowLeft, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BottomNav from "./BottomNav";
import Header from "./Header";
import SearchInput from "../forms/SearchInput";

type PageLayoutProps = {
    title: string;
    children: ReactNode;
    className?: string;
    contentClassName?: string;

    showPageHeader?: boolean;
    subtitle?: string;
    showBackButton?: boolean;
    backTo?: string;
    onBack?: () => void;

    searchValue?: string;
    searchPlaceholder?: string;
    onSearchChange?: (value: string) => void;

    showFilterButton?: boolean;
    isFilterOpen?: boolean;
    onToggleFilters?: () => void;
    filterContent?: ReactNode;
};

const PageLayout = ({
    title,
    children,
    className = "",
    contentClassName = "",

    showPageHeader = true,
    subtitle = "Gerenciar",
    showBackButton = true,
    backTo = "/",
    onBack,

    searchValue,
    searchPlaceholder,
    onSearchChange,

    showFilterButton = false,
    isFilterOpen = false,
    onToggleFilters,
    filterContent,
}: PageLayoutProps) => {
    const navigate = useNavigate();

    const hasSearch = searchValue !== undefined && onSearchChange;

    const handleBack = () => {
        if (onBack) {
            onBack();
            return;
        }

        navigate(backTo);
    };

    return (
        <>
            <Header />

            <section
                aria-label={title}
                className={`min-h-screen  bg-gray-200 px-10 pt-24 pb-28 ${className}`.trim()}
            >
                <div className={contentClassName}>
                    {showPageHeader && (
                        <div className="mb-7 flex items-center gap-4">
                            {showBackButton && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    aria-label="Voltar"
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition hover:bg-gray-50 hover:text-gray-800"
                                >
                                    <ArrowLeft size={18} />
                                </button>
                            )}

                            <h1 className="text-base font-extrabold tracking-[0.22em] text-gray-950">
                                {subtitle}{" "}
                                <span className="text-red-500">
                                    {title}
                                </span>
                            </h1>
                        </div>
                    )}

                    {hasSearch && (
                        <div className="mb-6 flex items-center gap-4">
                            <SearchInput
                                value={searchValue}
                                onChange={onSearchChange}
                                placeholder={
                                    searchPlaceholder ?? `Pesquisar ${title.toLowerCase()}...`
                                }
                                className="flex-1"
                            />

                            {showFilterButton && (
                                <button
                                    type="button"
                                    onClick={onToggleFilters}
                                    className={`flex h-10 items-center gap-2 rounded-lg border px-7 text-sm font-bold shadow-sm transition ${
                                        isFilterOpen
                                            ? "border-red-300 bg-white text-red-500 hover:bg-red-50"
                                            : "border-gray-200 bg-white text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                                    }`}
                                >
                                    <SlidersHorizontal size={16} />
                                    Filtrar
                                </button>
                            )}
                        </div>
                    )}

                    {isFilterOpen && filterContent && (
                        <div className="mb-6">
                            {filterContent}
                        </div>
                    )}

                    {children}
                </div>
            </section>

            <BottomNav />
        </>
    );
};

export default PageLayout;