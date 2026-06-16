import { parseInput } from '../utils/decimalEngine';
import { historyService } from '../services/history';
import { storageService } from '../services/storage';
import { CalculationResult } from '../types/calculator';

type Listener = () => void;

class CalculatorStore {
  private listeners: Set<Listener> = new Set();
  
  public weightInput: string = storageService.get<string>('ismar_weight') || '';
  public priceInput: string = storageService.get<string>('ismar_price') || '';
  
  public result: CalculationResult | null = null;
  public totalOutput: string = '0.00';
  public error: string | null = null;

  constructor() {
    if (this.weightInput || this.priceInput) {
      this.recalculate();
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  setWeight(weight: string) {
    this.weightInput = weight;
    storageService.set('ismar_weight', weight);
    this.recalculate();
  }

  setPrice(price: string) {
    this.priceInput = price;
    storageService.set('ismar_price', price);
    this.recalculate();
  }

  private recalculate() {
    this.error = null;
    this.result = null;
    this.totalOutput = '0.00';

    if (!this.weightInput && !this.priceInput) {
      this.notify();
      return;
    }

    try {
      const wDec = parseInput(this.weightInput);
      const pDec = parseInput(this.priceInput);

      const totalDec = wDec.mul(pDec);
      
      this.result = {
        weight: wDec,
        pricePerGram: pDec,
        total: totalDec,
        date: new Date().toISOString()
      };

      this.totalOutput = totalDec.toFixed(2);

      const history = historyService.getHistory();
      const lastItem = history[0];
      let isDuplicate = false;

      if (lastItem) {
        try {
          const lastW = parseInput(lastItem.weightStr);
          const lastP = parseInput(lastItem.priceStr);
          const lastT = parseInput(lastItem.totalStr);

          if (lastW.equals(wDec) && lastP.equals(pDec) && lastT.equals(totalDec)) {
            isDuplicate = true;
          }
        } catch {
          // If history fails to parse, it's not a logical duplicate
        }
      }

      if (!isDuplicate) {
        historyService.addItem({
          id: Date.now().toString() + '_' + Math.random().toString(36).substr(2, 5),
          weightStr: this.weightInput,
          priceStr: this.priceInput,
          totalStr: this.totalOutput,
          timestamp: Date.now()
        });
      }
    } catch (err: any) {
      this.error = err.message;
    }

    this.notify();
  }
}

export const calculatorStore = new CalculatorStore();
