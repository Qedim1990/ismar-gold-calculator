import Decimal from 'decimal.js';

export interface CalculationResult {
  weight: Decimal;
  pricePerGram: Decimal;
  total: Decimal;
  date: string;
}
