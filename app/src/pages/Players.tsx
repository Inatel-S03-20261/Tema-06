import { useState } from "react";
import { jogadoresMock } from "../services/playerService";
import type { Player } from "../types/Player";
import { Link } from "react-router-dom";

const Players = () => {
    const [jogadores, setJogadores] = useState<Player[]>(jogadoresMock);
    const [filtro, setFiltro] = useState("");

    const jogadoresFiltrados = jogadores.filter((jogador) =>
        jogador.nome.toLowerCase().includes(filtro.toLowerCase()),
    );

    const alterarBanimento = (id: string) => {
        const jogadoresAtualizados = jogadores.map((jogador) => {
            if (jogador.id === id) {
                return {
                    ...jogador,
                    statusBanimento: !jogador.statusBanimento,
                };
            }

            return jogador;
        });

        setJogadores(jogadoresAtualizados);
    };

    return (
        <section className="pt-24 mx-8 md:mx-12 min-h-screen">
            <h1 className="text-4xl mb-6">Jogadores</h1>
            
            <input
                type="text"
                placeholder="Filtrar por nome"
                value={filtro}
                onChange={(event) => setFiltro(event.target.value)}
                className="border border-gray-400 rounded px-4 py-2 mb-6 w-full max-w-md"
            />

            <div className="flex flex-col gap-4">
                {jogadoresFiltrados.map((jogador) => (
                    <div
                        key={jogador.id}
                        className="border border-gray-300 rounded p-4 flex flex-col gap-2"
                    >
                        <h2 className="text-2xl font-semibold">{jogador.nome}</h2>

                        <p>Nível: {jogador.nivel}</p>

                        <p>
                            Status:{" "}
                            {jogador.statusBanimento ? "Banido" : "Ativo"}
                        </p>

                        <button
                            onClick={() => alterarBanimento(jogador.id)}
                            className="bg-indigo-500 text-white px-4 py-2 rounded w-fit"
                        >
                            {jogador.statusBanimento
                                ? "Desbanir"
                                : "Banir"}
                        </button>
                    </div>
                ))}
            </div>
            <Link
            to="/"
            className="fixed bottom-6 right-6 bg-indigo-500 text-white px-4 py-3 rounded shadow"
            >
            Voltar para Home
            </Link>
        </section>
    );
};

export default Players;