import React, { useEffect, useState } from 'react';

export const SplashScreen: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1200);
    const removeTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`fixed inset-0 bg-yellow-500 z-50 flex flex-col items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0' : 'opacity-100'}`}>
      <h1 className="text-5xl font-black text-white mb-2 tracking-widest drop-shadow-md">İSMAR</h1>
      <p className="text-yellow-100 text-lg font-semibold tracking-wide">Qızıl Kalkulyatoru</p>
    </div>
  );
};
