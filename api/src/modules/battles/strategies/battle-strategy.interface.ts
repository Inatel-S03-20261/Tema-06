import type { Card } from '../../cards/cards.schema.js';

export interface IBattleStrategy {
  /**
   * Avalia duas cartas e retorna a vencedora. 
   * Retorna null em caso de empate.
   */
  evaluate(card1: Card, card2: Card): Card | null;
}