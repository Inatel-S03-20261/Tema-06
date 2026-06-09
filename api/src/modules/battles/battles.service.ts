import { BattleContext } from './battle.context.js';
import { HighestHpStrategy } from './strategies/highest-hp.strategy.js';
import { HighestAttackStrategy } from './strategies/highest-attack.strategy.js';
import type { Card } from '../cards/cards.schema.js';

export class BattlesService {
  
  /**
   * Avalia uma ronda específica baseada num critério e retorna o ID do Pokémon vencedor.
   */
  public evaluateBattleRound(card1: Card, card2: Card, criteria: 'hp' | 'attack'): string | null {
    let context: BattleContext;

    // A única instrução condicional necessária é para selecionar a estratégia
    switch(criteria) {
      case 'hp':
        context = new BattleContext(new HighestHpStrategy());
        break;
      case 'attack':
        context = new BattleContext(new HighestAttackStrategy());
        break;
      default:
        context = new BattleContext(new HighestHpStrategy()); // Fallback padrão
    }

    const winnerCard = context.executeRound(card1, card2);
    
    // Retorna o ID (no teu schema Zod é um int para o pokemonId, 
    // mas podes ajustar conforme a tua necessidade exata (ex: UUID do jogador vencedor))
    return winnerCard ? String(winnerCard.id) : null; 
  }
}