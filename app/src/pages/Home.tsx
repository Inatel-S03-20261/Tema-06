import {
    Users,
    Layers,
    Swords,
    ArrowLeftRight,
} from "lucide-react";

import HomeCard from "../components/home/HomeCard";
import PageLayout from "../components/layout/PageLayout";
import { batalhasMock } from "../services/battleService";
import { cartasMock } from "../services/cardService";
import { jogadoresMock } from "../services/playerService";
import { trocasMock } from "../services/tradeService";

const Home = () => {
    const userName = "Administrador";
    const playersCount = jogadoresMock.length;
    const cardsCount = cartasMock.length;
    const battlesCount = batalhasMock.length;
    const tradesCount = trocasMock.length;

    return (
        <PageLayout
            title={`Bem-vindo, ${userName} 👋`}
            subtitle="Gerenciar"
            contentClassName="grid gap-4 md:grid-cols-2"
        >
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
        </PageLayout>
    );
};

export default Home;