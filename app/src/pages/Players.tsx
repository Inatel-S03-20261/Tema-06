import PageLayout from "../components/layout/PageLayout";
import FilterPanel from "../components/forms/FilterPanel";
import FilterChip from "../components/forms/FilterChip";
import PlayerDetailsSidebar from "../components/players/PlayerDetailsSidebar";
import PlayerTable from "../components/players/PlayerTable";
import { usePlayersFacade } from "../hooks/usePlayersFacade";

const Players = () => {
    const {
        filtro,
        setFiltro,

        statusFiltro,
        setStatusFiltro,
        statusOptions,

        jogadoresFiltrados,
        selectedPlayer,
        selectedPlayerId,

        isDetailsOpen,
        isFilterOpen,

        selecionarJogador,
        fecharDetalhes,
        alternarFiltros,

        alterarBanimento,
        alterarNivel,
    } = usePlayersFacade();

    return (
        <div
            className={`transition-all duration-300 ease-in-out ${
                isDetailsOpen ? "pr-[50vw]" : "pr-0"
            }`}
        >
            <PageLayout
                title="Jogadores"
                subtitle="Gerenciar"
                contentClassName="relative"
                searchValue={filtro}
                searchPlaceholder="Pesquisar jogador..."
                onSearchChange={setFiltro}
                showFilterButton
                isFilterOpen={isFilterOpen}
                onToggleFilters={alternarFiltros}
                filterContent={
                    <FilterPanel>
                        <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
                            Status do Jogador
                        </p>

                        <div className="flex flex-wrap gap-3">
                            {statusOptions.map((status) => (
                                <FilterChip
                                    key={status}
                                    active={statusFiltro === status}
                                    onClick={() => setStatusFiltro(status)}
                                >
                                    {status}
                                </FilterChip>
                            ))}
                        </div>
                    </FilterPanel>
                }
            >
                <PlayerTable
                    players={jogadoresFiltrados}
                    selectedPlayerId={isDetailsOpen ? selectedPlayerId : undefined}
                    onSelectPlayer={selecionarJogador}
                    onToggleBan={alterarBanimento}
                    onToggleLevel={alterarNivel}
                />
            </PageLayout>

            <div
                className={`fixed right-0 top-[58px] bottom-[60px] z-30 w-[50vw] bg-white transform transition-transform duration-300 ease-in-out ${
                    isDetailsOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <PlayerDetailsSidebar
                    player={selectedPlayer}
                    onClose={fecharDetalhes}
                />
            </div>
        </div>
    );
};

export default Players;