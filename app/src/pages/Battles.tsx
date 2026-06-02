import { useMemo, useState } from "react";

import BattleTable from "../components/battles/BattleTable";
import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import PageLayout from "../components/layout/PageLayout";
import SearchInput from "../components/forms/SearchInput";
import SelectInput from "../components/forms/SelectInput";
import { batalhasMock } from "../services/battleService";
import type { BattleStatus } from "../types/Battle";

type BattleStatusFilter = "Todas" | BattleStatus;

const statusOptions: BattleStatusFilter[] = [
    "Todas",
    "Agendada",
    "Em andamento",
    "Finalizada",
];

const Battles = () => {
    const [jogadorFiltro, setJogadorFiltro] = useState("");
    const [statusFiltro, setStatusFiltro] =
        useState<BattleStatusFilter>("Todas");
    const hasActiveFilters = jogadorFiltro !== "" || statusFiltro !== "Todas";

    const batalhasFiltradas = useMemo(
        () =>
            batalhasMock.filter((battle) => {
                const nomeJogadores =
                    `${battle.jogadorA.nome} ${battle.jogadorB.nome}`.toLowerCase();
                const jogadorValido = nomeJogadores.includes(
                    jogadorFiltro.toLowerCase(),
                );
                const statusValido =
                    statusFiltro === "Todas" || battle.status === statusFiltro;

                return jogadorValido && statusValido;
            }),
        [jogadorFiltro, statusFiltro],
    );

    const limparFiltros = () => {
        setJogadorFiltro("");
        setStatusFiltro("Todas");
    };

    return (
        <PageLayout title="Batalhas">
            <BattleTable
                battles={batalhasFiltradas}
                filters={
                    <>
                        <SearchInput
                            label="Jogador"
                            value={jogadorFiltro}
                            onChange={setJogadorFiltro}
                            placeholder="Pesquisar jogador..."
                        />
                        <SelectInput
                            label="Status"
                            value={statusFiltro}
                            options={statusOptions}
                            onChange={(value) =>
                                setStatusFiltro(value as BattleStatusFilter)
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

export default Battles;
