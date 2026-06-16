import { useState, useEffect } from 'react';
import { calculatorStore } from '../store/calculatorStore';

export function useCalculatorStore() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const unsubscribe = calculatorStore.subscribe(() => forceRender(c => c + 1));
    return () => { unsubscribe(); };
  }, []);

  return calculatorStore;
}
