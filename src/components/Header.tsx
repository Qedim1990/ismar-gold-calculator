import React from 'react';
import { SettingsPanel } from './SettingsPanel';

export const Header: React.FC = () => (
  <header className="py-4 px-6 bg-white shadow-sm flex justify-between items-center sticky top-0 z-40">
    <h1 className="text-xl font-extrabold text-yellow-600 tracking-tight">İSMAR Qızıl</h1>
    <SettingsPanel />
  </header>
);
