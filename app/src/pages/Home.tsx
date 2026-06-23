import { ArrowLeftRight, Layers, Swords, Users } from "lucide-react";

import ActivityAreaChart from "../components/home/ActivityAreaChart";
import CardTypesBarChart from "../components/home/CardTypesBarChart";
import DashboardStatCard from "../components/home/DashboardStatCard";
import PlayerStatusDonut from "../components/home/PlayerStatusDonut";
import RecentActivityFeed from "../components/home/RecentActivityFeed";
import TopTradedCards from "../components/home/TopTradedCards";
import PageLayout from "../components/layout/PageLayout";
import { useDashboardFacade } from "../hooks/useDashboardFacade";

const Home = () => {
    const userName = "Administrador";
    const { dashboard, isLoading } = useDashboardFacade();
    const { stats } = dashboard;

    return (
        <PageLayout
            title=""
            showPageHeader={false}
            subtitle="Gerenciar"
            contentClassName="flex flex-col gap-4"
        >
            <header>
                <h1 className="text-2xl font-extrabold tracking-wide text-gray-950">
                    Bem-vindo, {userName}
                </h1>
                <p className="text-sm text-gray-500">
                    {isLoading
                        ? "Carregando métricas..."
                        : "Visão geral do sistema em tempo real"}
                </p>
            </header>

            <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <DashboardStatCard
                    title="Jogadores"
                    value={stats.jogadores.total}
                    subtitle={`${stats.jogadores.ativos} ativos · ${stats.jogadores.banidos} banidos`}
                    icon={Users}
                    iconClassName="bg-red-100 text-red-500"
                />
                <DashboardStatCard
                    title="Trocas"
                    value={stats.trocas.total}
                    subtitle={`${stats.trocas.abertas} abertas · ${stats.trocas.propostas} propostas`}
                    icon={ArrowLeftRight}
                    iconClassName="bg-green-100 text-green-600"
                />
                <DashboardStatCard
                    title="Batalhas"
                    value={stats.batalhas.total}
                    subtitle={`${stats.batalhas.agendadas} agendadas · ${stats.batalhas.finalizadas} finalizadas`}
                    icon={Swords}
                    iconClassName="bg-yellow-100 text-yellow-600"
                />
                <DashboardStatCard
                    title="Cartas"
                    value={stats.cartas.total}
                    subtitle="Catálogo de pokémons"
                    icon={Layers}
                    iconClassName="bg-indigo-100 text-indigo-500"
                />
            </section>

            <section className="grid gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                    <ActivityAreaChart data={dashboard.atividadeMensal} />
                </div>
                <PlayerStatusDonut data={dashboard.statusJogadores} />
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
                <CardTypesBarChart data={dashboard.tiposDeCartas} />
                <TopTradedCards data={dashboard.maisNegociados} />
            </section>

            <RecentActivityFeed data={dashboard.atividadeRecente} />
        </PageLayout>
    );
};

export default Home;
