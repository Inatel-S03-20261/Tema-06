import { useMemo, useState } from "react";

import CardTable from "../components/cards/CardTable";
import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/forms/SearchInput";
import SelectInput from "../components/forms/SelectInput";
import { cartasMock } from "../services/cardService";

type CardFilter = "Todos" | string;

const Cards = () => {
    const [nomeFiltro, setNomeFiltro] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState<CardFilter>("Todos");
    const [raridadeFiltro, setRaridadeFiltro] = useState<CardFilter>("Todos");

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
        <PageLayout title="Cartas">
            <CardTable
                cards={cartasFiltradas}
                filters={
                    <>
                        <SearchInput
                            label="Carta"
                            value={nomeFiltro}
                            onChange={setNomeFiltro}
                            placeholder="Pesquisar carta..."
                        />
                        <SelectInput
                            label="Tipo"
                            value={tipoFiltro}
                            options={tipoOptions}
                            onChange={setTipoFiltro}
                        />
                        <SelectInput
                            label="Raridade"
                            value={raridadeFiltro}
                            options={raridadeOptions}
                            onChange={setRaridadeFiltro}
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

export default Cards;
