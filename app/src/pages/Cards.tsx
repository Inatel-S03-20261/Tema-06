import { useMemo, useState } from "react";

import CardTable from "../components/cards/CardTable";
import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import FilterPanel from "../components/forms/FilterPanel";
import PageLayout from "../components/layout/PageLayout";
import SelectInput from "../components/forms/SelectInput";
import { cartasMock } from "../services/cardService";

type CardFilter = "Todos" | string;

const Cards = () => {
    const [nomeFiltro, setNomeFiltro] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState<CardFilter>("Todos");
    const [raridadeFiltro, setRaridadeFiltro] = useState<CardFilter>("Todos");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const tipoOptions = useMemo(
        () => [
            "Todos",
            ...Array.from(new Set(cartasMock.map((card) => card.tipo))),
        ],
        [],
    );

    const raridadeOptions = useMemo(
        () => [
            "Todos",
            ...Array.from(new Set(cartasMock.map((card) => card.raridade))),
        ],
        [],
    );

    const hasActiveFilters =
        nomeFiltro !== "" ||
        tipoFiltro !== "Todos" ||
        raridadeFiltro !== "Todos";

    const cartasFiltradas = useMemo(
        () =>
            cartasMock.filter((card) => {
                const nomeValido = card.nome
                    .toLowerCase()
                    .includes(nomeFiltro.toLowerCase());

                const tipoValido =
                    tipoFiltro === "Todos" || card.tipo === tipoFiltro;

                const raridadeValida =
                    raridadeFiltro === "Todos" ||
                    card.raridade === raridadeFiltro;

                return nomeValido && tipoValido && raridadeValida;
            }),
        [nomeFiltro, raridadeFiltro, tipoFiltro],
    );

    const limparFiltros = () => {
        setNomeFiltro("");
        setTipoFiltro("Todos");
        setRaridadeFiltro("Todos");
    };

    return (
        <PageLayout
            title="Cartas"
            subtitle="Gerenciar"
            searchValue={nomeFiltro}
            searchPlaceholder="Pesquisar carta..."
            onSearchChange={setNomeFiltro}
            showFilterButton
            isFilterOpen={isFilterOpen}
            onToggleFilters={() => setIsFilterOpen((value) => !value)}
            filterContent={
                <FilterPanel>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Filtros da Carta
                    </p>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
                        <SelectInput
                            label="Tipo"
                            value={tipoFiltro}
                            onChange={setTipoFiltro}
                            options={tipoOptions}
                        />

                        <SelectInput
                            label="Raridade"
                            value={raridadeFiltro}
                            onChange={setRaridadeFiltro}
                            options={raridadeOptions}
                        />

                        <ClearFiltersButton
                            onClick={limparFiltros}
                            disabled={!hasActiveFilters}
                        />
                    </div>
                </FilterPanel>
            }
        >
            <CardTable cards={cartasFiltradas} />
        </PageLayout>
    );
};

export default Cards;