import type { Card } from '../cards/cards.schema.js';
import type { IBattleStrategy } from './strategies/battle-strategy.interface.js';

export class BattleContext {
  private strategy: IBattleStrategy;

  constructor(strategy: IBattleStrategy) {
    this.strategy = strategy;
  }

  public setStrategy(strategy: IBattleStrategy): void {
    this.strategy = strategy;
  }

  public executeRound(card1: Card, card2: Card): Card | null {
    if (!this.strategy) {
      throw new Error('Battle strategy is not defined.');
    }
    return this.strategy.evaluate(card1, card2);
  }
}