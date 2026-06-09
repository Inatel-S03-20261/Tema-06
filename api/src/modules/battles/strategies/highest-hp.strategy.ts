import type { Card } from '../../cards/cards.schema.js';
import type { IBattleStrategy } from './battle-strategy.interface.js';

export class HighestHpStrategy implements IBattleStrategy {
  evaluate(card1: Card, card2: Card): Card | null {
    // Fazemos parse para garantir a segurança numérica, dependendo do schema
    const hp1 = Number(card1.hp) || 0;
    const hp2 = Number(card2.hp) || 0;

    if (hp1 > hp2) return card1;
    if (hp2 > hp1) return card2;
    
    return null; // Empate
  }
}