import { useMemo, useState } from "react";

import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/forms/SearchInput";
import SelectInput from "../components/forms/SelectInput";
import TradeTable from "../components/trades/TradeTable";
import { trocasMock } from "../services/tradeService";
import type { TradeStatus } from "../types/Trade";

type TradeStatusFilter = "Todas" | TradeStatus;

const statusOptions: TradeStatusFilter[] = [
    "Todas",
    "Aberta",
    "Proposta",
    "Finalizada",
];

const Trades = () => {
    const [statusFiltro, setStatusFiltro] =
        useState<TradeStatusFilter>("Todas");
    const [cartaFiltro, setCartaFiltro] = useState("");
    const hasActiveFilters = statusFiltro !== "Todas" || cartaFiltro !== "";

    const trocasFiltradas = useMemo(
        () =>
            trocasMock.filter((troca) => {
                const statusValido =
                    statusFiltro === "Todas" || troca.status === statusFiltro;
                const cartaValida = troca.cartasOfertadas.some((carta) =>
                    carta.nome
                        .toLowerCase()
                        .includes(cartaFiltro.toLowerCase()),
                );

                return statusValido && cartaValida;
            }),
        [cartaFiltro, statusFiltro],
    );

    const limparFiltros = () => {
        setStatusFiltro("Todas");
        setCartaFiltro("");
    };

    return (
        <PageLayout title="Trocas">
            <TradeTable
                trades={trocasFiltradas}
                filters={
                    <>
                        <SearchInput
                            label="Carta"
                            value={cartaFiltro}
                            onChange={setCartaFiltro}
                            placeholder="Filtrar por carta"
                        />
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
                    </>
                }
            />
        </PageLayout>
    );
};

export default Trades;
