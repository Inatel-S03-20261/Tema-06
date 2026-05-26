import {
    Users,
    Layers,
    Swords,
    ArrowLeftRight,
} from "lucide-react";

import HomeCard from "../components/HomeCard";
import PageLayout from "../components/PageLayout";

const Home = () => {
    const userName = "Administrador";

    const playersCount = 1200;
    const cardsCount = 1200;
    const battlesCount = 1200;
    const tradesCount = 1200;

    return (
        <PageLayout title={`Bem-vindo, ${userName} 👋`}>
            <p className="mb-4 text-sm font-bold tracking-[0.2em] text-gray-500">
                GERENCIAR
            </p>

            <div className="grid gap-4 md:grid-cols-2">
                <HomeCard
                    title="Jogadores"
                    description="Gerencia treinadores, perfis e status de conta"
                    to="/jogadores"
                    badge={`${playersCount.toLocaleString("pt-BR")} ativos`}
                    icon={Users}
                    iconClassName="bg-red-100 text-red-500"
                    badgeClassName="bg-red-100 text-red-500"
                />

                <HomeCard
                    title="Cartas"
                    description="Catálogo completo de pokemons e raridades"
                    to="/cartas"
                    badge={`${cardsCount.toLocaleString("pt-BR")} cartas`}
                    icon={Layers}
                    iconClassName="bg-indigo-100 text-indigo-500"
                    badgeClassName="bg-indigo-100 text-indigo-600"
                />

                <HomeCard
                    title="Batalhas"
                    description="Histórico e gerenciamento de batalhas"
                    to="/batalhas"
                    badge={`${battlesCount.toLocaleString("pt-BR")} hoje`}
                    icon={Swords}
                    iconClassName="bg-yellow-100 text-yellow-600"
                    badgeClassName="bg-yellow-100 text-yellow-700"
                />

                <HomeCard
                    title="Trocas"
                    description="Pedidos de troca e histórico"
                    to="/trocas"
                    badge={`${tradesCount.toLocaleString("pt-BR")} hoje`}
                    icon={ArrowLeftRight}
                    iconClassName="bg-green-100 text-green-600"
                    badgeClassName="bg-green-100 text-green-700"
                />
            </div>
        </PageLayout>
    );
};

export default Home;