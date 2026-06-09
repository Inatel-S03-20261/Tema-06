import type { Card } from '../../cards/cards.schema.js';
import type { IBattleStrategy } from './battle-strategy.interface.js';

export class HighestAttackStrategy implements IBattleStrategy {
  evaluate(card1: Card, card2: Card): Card | null {
    const attack1 = Number(card1.attack) || 0;
    const attack2 = Number(card2.attack) || 0;

    if (attack1 > attack2) return card1;
    if (attack2 > attack1) return card2;
    
    return null;
  }
}