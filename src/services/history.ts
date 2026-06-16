import { HistoryItem } from '../types/history';
import { storageService } from './storage';

const HISTORY_KEY = 'ismar_calc_history';
const MAX_HISTORY_ITEMS = 20;

export const historyService = {
  getHistory(): HistoryItem[] {
    return storageService.get<HistoryItem[]>(HISTORY_KEY) || [];
  },

  addItem(item: HistoryItem): HistoryItem[] {
    const history = this.getHistory();
    // Prepend new item
    const newHistory = [item, ...history];
    
    // Enforce max 20 items (FIFO eviction)
    if (newHistory.length > MAX_HISTORY_ITEMS) {
      newHistory.length = MAX_HISTORY_ITEMS;
    }
    
    storageService.set(HISTORY_KEY, newHistory);
    return newHistory;
  },

  clearHistory(): void {
    storageService.remove(HISTORY_KEY);
  }
};
