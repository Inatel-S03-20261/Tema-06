import { useParams } from "react-router-dom";
import CardList from "../components/cards/CardList";
import PageLayout from "../components/PageLayout";
import PageSection from "../components/PageSection";
import PlayerLevel from "../components/players/PlayerLevel";
import PlayerStatus from "../components/players/PlayerStatus";
import TradeList from "../components/trades/TradeList";
import {
    buscarCartasPorJogador,
    buscarJogadorPorId,
} from "../services/playerService";
import { buscarTrocasPorJogador } from "../services/tradeService";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const jogador = playerId ? buscarJogadorPorId(playerId) : undefined;

    if (!jogador) {
        return (
            <PageLayout title="Jogador não encontrado">
                <p>Não foi possível localizar as informações deste jogador.</p>
            </PageLayout>
        );
    }

    const cartas = buscarCartasPorJogador(jogador.id);
    const trocas = buscarTrocasPorJogador(jogador.id);

    return (
        <PageLayout title={`Detalhes de ${jogador.nome}`}>
            <div className="flex flex-col gap-8">
                <PageSection title="Perfil">
                    <div className="border border-gray-300 rounded p-4 flex flex-col gap-2">
                        <p>ID: {jogador.id}</p>
                        <p>
                            Tipo: <PlayerLevel level={jogador.nivel} />
                        </p>
                        <p>
                            Status:{" "}
                            <PlayerStatus isBanned={jogador.statusBanimento} />
                        </p>
                    </div>
                </PageSection>

                <PageSection title="Cartas">
                    <CardList cards={cartas} />
                </PageSection>

                <PageSection title="Trocas">
                    <TradeList trades={trocas} />
                </PageSection>
            </div>
        </PageLayout>
    );
};

export default PlayerDetails;
