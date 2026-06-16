import React, { useState } from 'react';

export const SettingsPanel: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)} 
        className="text-gray-500 hover:text-gray-800 p-2 font-medium"
      >
        Ayarlar
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end transition-opacity">
          <div className="w-72 bg-white h-full shadow-2xl p-6 flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h2 className="font-extrabold text-2xl text-gray-900">Ayarlar</h2>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-gray-400 hover:text-gray-700 bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-semibold"
              >
                Bağla
              </button>
            </div>
            
            <div className="flex-1">
              <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-100">
                <p className="text-sm text-yellow-800 font-medium">Bu bölmə gələcək yenilənmələrdə aktiv olacaq.</p>
              </div>
            </div>
            
            <div className="mt-auto border-t border-gray-100 pt-6">
              <p className="text-center text-xs text-gray-400 font-medium">İSMAR v1.0.0</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
