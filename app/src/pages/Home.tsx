import { useEffect, useState } from "react";
import {
    Users,
    Layers,
    Swords,
    ArrowLeftRight,
} from "lucide-react";

import HomeCard from "../components/home/HomeCard";
import PageLayout from "../components/layout/PageLayout";
import { listarBatalhas } from "../services/battleService";
import { listarCartas } from "../services/cardService";
import { listarJogadores } from "../services/playerService";
import { listarTrocas } from "../services/tradeService";

const Home = () => {
    const userName = "Administrador";
    const [playersCount, setPlayersCount] = useState(0);
    const [cardsCount, setCardsCount] = useState(0);
    const [battlesCount, setBattlesCount] = useState(0);
    const [tradesCount, setTradesCount] = useState(0);

    useEffect(() => {
        listarJogadores()
            .then((jogadores) => setPlayersCount(jogadores.length))
            .catch((erro) => console.error("Erro ao carregar jogadores", erro));
        listarCartas()
            .then((cartas) => setCardsCount(cartas.length))
            .catch((erro) => console.error("Erro ao carregar cartas", erro));
        listarBatalhas()
            .then((batalhas) => setBattlesCount(batalhas.length))
            .catch((erro) => console.error("Erro ao carregar batalhas", erro));
        listarTrocas()
            .then((trocas) => setTradesCount(trocas.length))
            .catch((erro) => console.error("Erro ao carregar trocas", erro));
    }, []);

    return (
        <PageLayout
            title={``}
            showPageHeader={false}
            subtitle="Gerenciar"
            contentClassName="grid gap-4 md:grid-cols-2"
        >
            <h1 className="md:col-span-2 text-base font-extrabold tracking-[0.22em] text-gray-950">
                Bem-vindo,{" "}
                <span className="text-red-500">
                    {userName} 👋
                </span>
            </h1>
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