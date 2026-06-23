import { useEffect, useMemo, useState } from "react";

import BattleTable from "../components/battles/BattleTable";
import ClearFiltersButton from "../components/forms/ClearFiltersButton";
import FilterPanel from "../components/forms/FilterPanel";
import PageLayout from "../components/layout/PageLayout";
import SelectInput from "../components/forms/SelectInput";
import { listarBatalhas } from "../services/battleService";
import type { Battle, BattleStatus } from "../types/Battle";

type BattleStatusFilter = "Todas" | BattleStatus;

const statusOptions: BattleStatusFilter[] = [
    "Todas",
    "Agendada",
    "Em andamento",
    "Finalizada",
];

const Battles = () => {
    const [batalhas, setBatalhas] = useState<Battle[]>([]);
    const [jogadorFiltro, setJogadorFiltro] = useState("");
    const [statusFiltro, setStatusFiltro] =
        useState<BattleStatusFilter>("Todas");
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    useEffect(() => {
        listarBatalhas()
            .then(setBatalhas)
            .catch((erro) => console.error("Erro ao carregar batalhas", erro));
    }, []);

    const hasActiveFilters =
        jogadorFiltro !== "" || statusFiltro !== "Todas";

    const batalhasFiltradas = useMemo(
        () =>
            batalhas.filter((battle) => {
                const nomeJogadores =
                    `${battle.jogadorA.nome} ${battle.jogadorB.nome}`.toLowerCase();

                const jogadorValido = nomeJogadores.includes(
                    jogadorFiltro.toLowerCase(),
                );

                const statusValido =
                    statusFiltro === "Todas" || battle.status === statusFiltro;

                return jogadorValido && statusValido;
            }),
        [batalhas, jogadorFiltro, statusFiltro],
    );

    const limparFiltros = () => {
        setJogadorFiltro("");
        setStatusFiltro("Todas");
    };

    return (
        <PageLayout
            title="Batalhas"
            subtitle="Gerenciar"
            searchValue={jogadorFiltro}
            searchPlaceholder="Pesquisar batalha..."
            onSearchChange={setJogadorFiltro}
            showFilterButton
            isFilterOpen={isFilterOpen}
            onToggleFilters={() => setIsFilterOpen((value) => !value)}
            filterContent={
                <FilterPanel>
                    <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                        Filtros da Batalha
                    </p>

                    <div className="flex flex-col gap-4 md:flex-row md:items-end">
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
                    </div>
                </FilterPanel>
            }
        >
            <BattleTable battles={batalhasFiltradas} />
        </PageLayout>
    );
};

export default Battles;