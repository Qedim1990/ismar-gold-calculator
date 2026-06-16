import React from 'react';
import { useCalculatorStore } from '../hooks/useCalculatorStore';

export const Inputs: React.FC = () => {
  const store = useCalculatorStore();

  return (
    <div className="flex flex-col space-y-4 p-6 bg-white rounded-2xl shadow-sm mx-4 mt-6 border border-gray-100">
      <div>
        <label htmlFor="price-input" className="block text-sm font-semibold text-gray-700 mb-1.5">
          1 Qramın Qiyməti (AZN)
        </label>
        <input 
          id="price-input"
          type="text" 
          inputMode="decimal"
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-lg font-medium text-gray-900"
          placeholder="Məsələn: 175"
          value={store.priceInput}
          onChange={(e) => store.setPrice(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="weight-input" className="block text-sm font-semibold text-gray-700 mb-1.5">
          Çəki (Qram)
        </label>
        <input 
          id="weight-input"
          type="text"
          inputMode="decimal" 
          className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors text-lg font-medium text-gray-900"
          placeholder="Məsələn: 2.5"
          value={store.weightInput}
          onChange={(e) => store.setWeight(e.target.value)}
        />
      </div>
      {store.error && (
        <p aria-live="assertive" className="text-red-500 text-sm mt-2 font-medium bg-red-50 p-3 rounded-lg">
          {store.error}
        </p>
      )}
    </div>
  );
};
