import React from 'react';
import { useCalculatorStore } from '../hooks/useCalculatorStore';

export const ResetButton: React.FC = () => {
  const store = useCalculatorStore();

  const handleReset = () => {
    store.setWeight('');
  };

  return (
    <button 
      onClick={handleReset}
      className="w-full bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800 font-bold py-3.5 rounded-xl transition-colors mt-6 shadow-sm"
    >
      Çəkini Sıfırla
    </button>
  );
};
