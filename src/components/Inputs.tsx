import React from 'react';
import { useCalculatorStore } from '../hooks/useCalculatorStore';

export const Inputs: React.FC = () => {
  const store = useCalculatorStore();

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    const nextTarget = e.relatedTarget as Node | null;

    if (nextTarget && e.currentTarget.contains(nextTarget)) {
      return;
    }

    store.commitHistory();
  };

  return (
    <div
      className="mx-4 mt-6 flex flex-col space-y-4 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
      onBlur={handleBlur}
    >
      <div>
        <label htmlFor="price-input" className="mb-1.5 block text-sm font-semibold text-gray-700">
          1 Qramın Qiyməti (AZN)
        </label>
        <input
          id="price-input"
          type="text"
          inputMode="decimal"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-medium text-gray-900 transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
          placeholder="Məsələn: 175"
          value={store.priceInput}
          onChange={(e) => store.setPrice(e.target.value)}
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="weight-input" className="mb-1.5 block text-sm font-semibold text-gray-700">
          Çəki (Qram)
        </label>
        <input
          id="weight-input"
          type="text"
          inputMode="decimal"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg font-medium text-gray-900 transition-colors focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500"
          placeholder="Məsələn: 2.5"
          value={store.weightInput}
          onChange={(e) => store.setWeight(e.target.value)}
          autoComplete="off"
        />
      </div>

      {store.error && (
        <p aria-live="assertive" className="mt-2 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-500">
          {store.error}
        </p>
      )}
    </div>
  );
};
