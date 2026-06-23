import { useEffect, useMemo, useState } from "react";

import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import FilterPanel from "../components/forms/FilterPanel";
import PageLayout from "../components/layout/PageLayout";
import SelectInput from "../components/forms/SelectInput";
import TradeTable from "../components/trades/TradeTable";
import { listarTrocas } from "../services/tradeService";
import type { Trade, TradeStatus } from "../types/Trade";

type TradeStatusFilter = "Todas" | TradeStatus;

const statusOptions: TradeStatusFilter[] = [
    "Todas",
    "Aberta",
    "Proposta",
    "Finalizada",
];

const Trades = () => {
    const [trocas, setTrocas] = useState<Trade[]>([]);
    const [statusFiltro, setStatusFiltro] =
        useState<TradeStatusFilter>("Todas");
    const [cartaFiltro, setCartaFiltro] = useState("");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        listarTrocas()
            .then(setTrocas)
            .catch((erro) => console.error("Erro ao carregar trocas", erro));
    }, []);

    const hasActiveFilters = statusFiltro !== "Todas" || cartaFiltro !== "";

    const trocasFiltradas = useMemo(
        () =>
            trocas.filter((troca) => {
                const statusValido =
                    statusFiltro === "Todas" || troca.status === statusFiltro;

                const cartaValida = troca.cartasOfertadas.some((carta) =>
                    carta.nome
                        .toLowerCase()
                        .includes(cartaFiltro.toLowerCase()),
                );

                return statusValido && cartaValida;
            }),
        [trocas, cartaFiltro, statusFiltro],
    );

    const limparFiltros = () => {
        setStatusFiltro("Todas");
        setCartaFiltro("");
    };

    return (
        <PageLayout
            title="Trocas"
            subtitle="Gerenciar"
            searchValue={cartaFiltro}
            searchPlaceholder="Pesquisar troca..."
            onSearchChange={setCartaFiltro}
            showFilterButton
            isFilterOpen={isFilterOpen}
            onToggleFilters={() => setIsFilterOpen((value) => !value)}
            filterContent={
                <FilterPanel>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Filtros da Troca
                    </p>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
                        <SelectInput
                            label="Status da troca"
                            value={statusFiltro}
                            options={statusOptions}
                            onChange={(value) =>
                                setStatusFiltro(value as TradeStatusFilter)
                            }
                        />

                        <ClearFiltersButton
                            onClick={limparFiltros}
                            disabled={!hasActiveFilters}
                        />
                    </div>
                </FilterPanel>
            }
        >
            <TradeTable trades={trocasFiltradas} />
        </PageLayout>
    );
};

export default Trades;