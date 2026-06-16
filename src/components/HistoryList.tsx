import React, { useEffect, useState } from 'react';
import { historyService } from '../services/history';
import { useCalculatorStore } from '../hooks/useCalculatorStore';
import { HistoryItem } from '../types/history';

export const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const store = useCalculatorStore();

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, [store.totalOutput, store.result]);

  if (history.length === 0) return null;

  return (
    <div className="mx-4 mt-8 mb-20">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-lg font-bold text-gray-800">Tarixçə</h3>
        <button 
          onClick={() => { historyService.clearHistory(); setHistory([]); }}
          className="text-sm font-semibold text-red-500 hover:text-red-600 transition-colors bg-red-50 px-3 py-1.5 rounded-lg"
        >
          Təmizlə
        </button>
      </div>
      <div className="space-y-3">
        {history.map(item => (
          <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <p className="font-bold text-gray-900 text-lg">{item.totalStr} ₼</p>
              <p className="text-sm text-gray-500 font-medium">{item.weightStr} qr × {item.priceStr} ₼</p>
            </div>
            <span className="text-xs font-semibold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
              {new Date(item.timestamp).toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
