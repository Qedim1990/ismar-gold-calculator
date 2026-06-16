import { parseInput } from '../utils/decimalEngine';
import { historyService } from '../services/history';
import { storageService } from '../services/storage';
import { CalculationResult } from '../types/calculator';

type Listener = () => void;

type HistorySnapshot = {
  weightStr: string;
  priceStr: string;
  totalStr: string;
};

class CalculatorStore {
  private listeners: Set<Listener> = new Set();
  private lastCommittedFingerprint: string | null = null;

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
    this.listeners.forEach((listener) => listener());
  }

  private makeItemId() {
    return `${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  }

  private fingerprintFromResult() {
    if (!this.result) {
      return '';
    }

    return [
      this.result.weight.toString(),
      this.result.pricePerGram.toString(),
      this.result.total.toString(),
    ].join('|');
  }

  private fingerprintFromHistoryItem(item: HistorySnapshot) {
    const weight = parseInput(item.weightStr).toString();
    const price = parseInput(item.priceStr).toString();
    const total = parseInput(item.totalStr).toString();

    return [weight, price, total].join('|');
  }

  commitHistory() {
    if (!this.result) {
      return;
    }

    if (this.result.total.isZero()) {
      return;
    }

    const currentFingerprint = this.fingerprintFromResult();

    if (this.lastCommittedFingerprint === currentFingerprint) {
      return;
    }

    const history = historyService.getHistory();
    const latest = history[0];

    if (latest) {
      try {
        const latestFingerprint = this.fingerprintFromHistoryItem(latest);

        if (latestFingerprint === currentFingerprint) {
          this.lastCommittedFingerprint = currentFingerprint;
          return;
        }
      } catch {
        // Ignore corrupted history entries and continue with the new valid one.
      }
    }

    historyService.addItem({
      id: this.makeItemId(),
      weightStr: this.weightInput,
      priceStr: this.priceInput,
      totalStr: this.totalOutput,
      timestamp: Date.now(),
    });

    this.lastCommittedFingerprint = currentFingerprint;
    this.notify();
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
        date: new Date().toISOString(),
      };

      this.totalOutput = totalDec.toFixed(2);
    } catch (err: any) {
      this.error = err?.message ?? 'Naməlum xəta';
    }

    this.notify();
  }
}

export const calculatorStore = new CalculatorStore();
