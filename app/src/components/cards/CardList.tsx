import type { Card } from "../../types/Card";

type CardListProps = {
    cards: Card[];
};

const CardList = ({ cards }: CardListProps) => {
    if (cards.length === 0) {
        return <p>Nenhuma carta encontrada.</p>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2">
            {cards.map((card) => (
                <article
                    key={card.id}
                    className="border border-gray-300 rounded p-4 flex flex-col gap-2"
                >
                    <h3 className="text-xl font-semibold">{card.nome}</h3>
                    <p>Raridade: {card.raridade}</p>
                    <p>Tipo: {card.tipo}</p>
                    <p>
                        Ataque: {card.ataque} | Defesa: {card.defesa}
                    </p>
                </article>
            ))}
        </div>
    );
};

export default CardList;
