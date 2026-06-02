import { useState } from "react";
import ClearFiltersButton from "../components/ClearFiltersButton";
import PageLayout from "../components/PageLayout";
import PageSection from "../components/PageSection";
import SearchInput from "../components/SearchInput";
import SelectInput from "../components/SelectInput";
import Tooltip from "../components/Tooltip";
import TradeList from "../components/trades/TradeList";
import TradeSummary from "../components/trades/TradeSummary";
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

    const trocasFiltradas = trocasMock.filter((troca) => {
        const statusValido =
            statusFiltro === "Todas" || troca.status === statusFiltro;
        const cartaValida = troca.cartasOfertadas.some((carta) =>
            carta.nome.toLowerCase().includes(cartaFiltro.toLowerCase()),
        );

        return statusValido && cartaValida;
    });

    const limparFiltros = () => {
        setStatusFiltro("Todas");
        setCartaFiltro("");
    };

    return (
        <PageLayout title="Trocas">
            <div className="flex flex-col gap-8">
                <TradeSummary trades={trocasMock} />

                <PageSection title="Filtros">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
                        <SearchInput
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
                    </div>
                </PageSection>

                <PageSection
                    title={
                        <>
                            Trocas
                            <Tooltip content="Aberta: disponível para negociação. Proposta: oferta recebida em análise. Finalizada: troca concluída." />
                        </>
                    }
                >
                    <TradeList trades={trocasFiltradas} />
                </PageSection>
            </div>
        </PageLayout>
    );
};

export default Trades;
