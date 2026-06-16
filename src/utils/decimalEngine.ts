import Decimal from 'decimal.js';

export function parseInput(input: string): Decimal {
  if (typeof input !== 'string') {
    throw new Error('Daxiletmə yalnız mətn formatında olmalıdır');
  }
  
  const trimmed = input.trim();
  if (trimmed === '') {
    throw new Error('Boş daxiletmə qəbul edilmir');
  }
  
  // Normalization: Replace comma with dot
  const normalized = trimmed.replace(/,/g, '.');
  
  // Reject negative, alphabetic, and malformed input
  // Only digits and at most one dot are allowed.
  const validPattern = /^[0-9]*\.?[0-9]+$/;
  const validPattern2 = /^[0-9]+\.?[0-9]*$/;
  if (!validPattern.test(normalized) && !validPattern2.test(normalized)) {
    throw new Error('Düzgün olmayan format: Yalnız müsbət rəqəmlər qəbul edilir');
  }
  
  let value: Decimal;
  try {
    value = new Decimal(normalized);
  } catch (error) {
    throw new Error('Düzgün olmayan format: Rəqəm emal edilə bilmədi');
  }
  
  if (value.isNegative()) {
    throw new Error('Mənfi rəqəmlər qəbul edilmir');
  }
  
  return value;
}

export function multiply(a: string, b: string): string {
  const decA = parseInput(a);
  const decB = parseInput(b);
  return decA.mul(decB).toString();
}
