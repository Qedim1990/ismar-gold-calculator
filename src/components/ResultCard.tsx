import React from 'react';
import { useCalculatorStore } from '../hooks/useCalculatorStore';
import { CopyButton } from './CopyButton';

export const ResultCard: React.FC = () => {
  const store = useCalculatorStore();

  return (
    <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-2xl p-6 mx-4 mt-4 shadow-xl shadow-yellow-500/20 text-white relative overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-sm font-semibold text-yellow-50 mb-1 opacity-90">Yekun Məbləğ</h2>
        <div className="flex items-baseline space-x-1 flex-wrap">
          <span className="text-4xl sm:text-5xl font-extrabold tracking-tight break-all">{store.totalOutput}</span>
          <span className="text-xl font-bold opacity-90 shrink-0">₼</span>
        </div>
        <div className="mt-6 flex justify-between items-center border-t border-yellow-400/30 pt-4">
          <p className="text-sm text-yellow-50 font-medium truncate pr-4">
            {store.weightInput || '0'} qr × {store.priceInput || '0'} ₼
          </p>
          <CopyButton value={`${store.totalOutput} AZN`} />
        </div>
      </div>
      <div className="absolute -right-12 -top-12 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -left-12 -bottom-12 w-32 h-32 bg-yellow-300 opacity-20 rounded-full blur-2xl pointer-events-none"></div>
    </div>
  );
};
